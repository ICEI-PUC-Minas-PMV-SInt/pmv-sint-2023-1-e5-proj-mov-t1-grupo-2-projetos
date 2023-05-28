package com.jme.adopterdla.adopterdla.configs.security;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.util.matcher.PathPatternParserServerWebExchangeMatcher;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatcher;

/**
 * Configuration class for Spring Security in a reactive web application.
 */
@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Constructs a new instance of {@link SecurityConfig}.
     * @param jwtAuthenticationFilter the {@link JwtAuthenticationFilter} to be used for JWT authentication
     */
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Configures the Spring Security filter chain.
     * @param http the {@link ServerHttpSecurity} object to be configured
     * @param authenticationManager the {@link ReactiveAuthenticationManager} object to be used for authentication
     * @return the configured {@link SecurityWebFilterChain}
     */
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http,
                                                            ReactiveAuthenticationManager authenticationManager) {
        // Disable CSRF protection
        http.csrf().disable()
                // Authorize access to /api/auth/** for all users
                .authorizeExchange()
                .pathMatchers("/api/auth/**","/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/webjars/**").permitAll()
                // Require authentication for all other requests
                .anyExchange().authenticated()
                .and()
                // Add the JWT authentication filter to the filter chain
                .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                // Set the authentication manager
                .authenticationManager(authenticationManager);
        return http.build();
    }

    /**
     * Returns a {@link ServerWebExchangeMatcher} for matching request paths.
     * @return a {@link PathPatternParserServerWebExchangeMatcher} that matches paths starting with /api/**
     */
    @Bean
    public ServerWebExchangeMatcher pathMatcher() {
        return new PathPatternParserServerWebExchangeMatcher("/api/**");
    }

    /**
     * Customize the OpenAPI definition to include the security information for JWT Bearer Token authentication.
     *
     * @return the customized OpenAPI definition
     */
    @Bean
    public OpenAPI customizeOpenAPI() {
        // Define the security scheme name
        final String securitySchemeName = "bearerAuth";

        // Create a new OpenAPI definition
        return new OpenAPI()
                // Add a security item to the OpenAPI definition
                .addSecurityItem(new SecurityRequirement()
                        // Add the security scheme name to the list of required security schemes
                        .addList(securitySchemeName))
                // Define the components of the OpenAPI definition
                .components(new Components()
                        // Add the security scheme to the components
                        .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                                // Set the security scheme name
                                .name(securitySchemeName)
                                // Set the security scheme type as HTTP
                                .type(SecurityScheme.Type.HTTP)
                                // Set the HTTP scheme as "bearer"
                                .scheme("bearer")
                                // Set the bearer token format as "JWT"
                                .bearerFormat("JWT")));
    }
}