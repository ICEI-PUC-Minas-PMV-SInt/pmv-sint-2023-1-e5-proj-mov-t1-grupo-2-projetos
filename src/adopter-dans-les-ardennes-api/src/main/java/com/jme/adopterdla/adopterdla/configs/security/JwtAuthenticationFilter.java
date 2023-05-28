package com.jme.adopterdla.adopterdla.configs.security;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository;
import org.springframework.stereotype.Component;

/**
 * A Spring Security {@link AuthenticationWebFilter} that authenticates requests using a JSON Web Token (JWT).
 * <p>
 * This filter extracts a JWT from the "Authorization" header of incoming requests and uses it to authenticate the user.
 * <p>
 * If the JWT is valid, the filter sets the authenticated user in the security context. If the JWT is invalid, the
 * <p>
 * filter responds with a 401 Unauthorized status.
 */
@Component
public class JwtAuthenticationFilter extends AuthenticationWebFilter {

    /**
     * Creates a new {@code JwtAuthenticationFilter} with the given {@link ServerAuthenticationConverter} and
     * {@link ReactiveAuthenticationManager}.
     *
     * @param authenticationConverter The converter used to convert an HTTP request to an authentication token.
     * @param authenticationManager   The authentication manager used to authenticate the token.
     */
    public JwtAuthenticationFilter(ServerAuthenticationConverter authenticationConverter,
                                   ReactiveAuthenticationManager authenticationManager) {
        super(authenticationManager);
        setServerAuthenticationConverter(authenticationConverter);
        setSecurityContextRepository(new WebSessionServerSecurityContextRepository());
    }
}