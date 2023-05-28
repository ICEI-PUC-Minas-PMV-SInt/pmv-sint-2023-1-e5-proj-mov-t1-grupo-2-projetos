package com.jme.adopterdla.adopterdla.configs.security.service;

import com.jme.adopterdla.adopterdla.auth.CustomUserDetails;
import com.jme.adopterdla.adopterdla.user.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDetailService {

    /**
     * Bean for creating a ReactiveUserDetailsService that retrieves user details from the UserRepository.
     *
     * @param userRepository The repository for accessing user details.
     * @return A ReactiveUserDetailsService implementation.
     */
    @Bean
    public ReactiveUserDetailsService userDetailsService(UserRepository userRepository) {
        return username -> userRepository.findByUsername(username)
                .map(user -> CustomUserDetails.customBuilder()
                        .username(user.getUsername())
                        .password(user.getPassword())
                        .friendlyName(user.getName())
                        .authorities(user.getRoles().stream()
                                .map(SimpleGrantedAuthority::new)
                                .toList())
                        .build());
    }

    /**
     * Bean for creating a PasswordEncoder instance.
     *
     * @return A PasswordEncoder instance.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Use BCryptPasswordEncoder to encode passwords.
        return new BCryptPasswordEncoder();
    }
}