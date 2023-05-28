package com.jme.adopterdla.adopterdla.configs.security;

import com.jme.adopterdla.adopterdla.auth.exception.UnauthorizedException;
import com.jme.adopterdla.adopterdla.configs.security.service.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;


/**
 * The JwtAuthenticationConverter class is responsible for converting the ServerHttpRequest into an
 * Authentication object by extracting the JWT token from the Authorization header, validating the token and
 * creating an instance of the UsernamePasswordAuthenticationToken class with the extracted username and authorities
 * if the token is valid.
 */
@Component
public class JwtAuthenticationConverter implements ServerAuthenticationConverter {
    private final JwtService jwtService;

    /**
     * Constructs an instance of the JwtAuthenticationConverter class with the given JwtService object.
     *
     * @param jwtService the JwtService object to use for validating and extracting information from the JWT token
     */
    public JwtAuthenticationConverter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    /**
     * Converts the ServerHttpRequest into an Authentication object by extracting the JWT token from the
     * Authorization header, validating the token and creating an instance of the UsernamePasswordAuthenticationToken
     * class with the extracted username and authorities if the token is valid.
     *
     * @param exchange the ServerWebExchange object representing the current exchange
     * @return a Mono object that emits the resulting Authentication object if the token is valid, or an empty Mono if
     * the token is invalid or not present
     */
    @Override
    public Mono<Authentication> convert(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();
        String authorizationHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            if (jwtService.isTokenExpired(jwt)) {
                // Token is expired
                return Mono.error(new UnauthorizedException("Token is expired"));
            } else if (jwtService.validateToken(jwt)) {
                String username = jwtService.extractUsername(jwt);
                List<SimpleGrantedAuthority> authorities = jwtService.extractAuthorities(jwt);
                return Mono.just(new UsernamePasswordAuthenticationToken(username, null, authorities));
            }
        }

        return Mono.empty();
    }
}