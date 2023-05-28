package com.jme.adopterdla.adopterdla.configs.security;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

/**
 * Implementation of {@link ReactiveAuthenticationManager} that validates a username and password
 * against a {@link ReactiveUserDetailsService} using a {@link PasswordEncoder}.
 */
@Component
public class JwtAuthenticationManager implements ReactiveAuthenticationManager {

    private final ReactiveUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructs a new instance of {@link JwtAuthenticationManager} with the provided user details service
     * and password encoder.
     *
     * @param userDetailsService the {@link ReactiveUserDetailsService} used to retrieve user details
     * @param passwordEncoder    the {@link PasswordEncoder} used to encode and compare passwords
     */
    public JwtAuthenticationManager(ReactiveUserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Authenticates the provided {@link Authentication} object by validating the username and password
     * against the user details retrieved from the {@link ReactiveUserDetailsService}.
     *
     * @param authentication the {@link Authentication} object to authenticate
     * @return a {@link Mono} emitting the authenticated {@link Authentication} object, or an error if authentication fails
     */
    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        if (authentication.isAuthenticated()) {
            // If the authentication object is already authenticated, return it as is
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return Mono.just(authentication);
        }
        return Mono.just(authentication)
                .flatMap(auth -> userDetailsService.findByUsername(auth.getName())
                        // Find the user details using the user details service based on the username
                        .switchIfEmpty(Mono.error(new UsernameNotFoundException("Invalid username or password.")))
                        // Throw an error if the user is not found
                        .flatMap(userDetails -> {
                            // Check if the entered password matches the stored password using the password encoder
                            if (passwordEncoder.matches(auth.getCredentials().toString(), userDetails.getPassword())) {
                                SecurityContextHolder.getContext().setAuthentication(authentication);
                                return Mono.just(userDetails);
                            } else {
                                // If the password does not match, throw a BadCredentialsException
                                return Mono.error(new BadCredentialsException("Invalid username or password."));
                            }
                        }))
                // Create and return a new UsernamePasswordAuthenticationToken using the retrieved user details
                .map(userDetails -> new UsernamePasswordAuthenticationToken(
                        userDetails,
                        userDetails.getPassword(),
                        userDetails.getAuthorities()));
    }

}