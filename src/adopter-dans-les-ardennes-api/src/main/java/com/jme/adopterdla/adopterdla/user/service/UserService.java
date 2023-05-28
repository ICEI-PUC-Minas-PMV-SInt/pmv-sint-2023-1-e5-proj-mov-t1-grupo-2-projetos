package com.jme.adopterdla.adopterdla.user.service;

import com.jme.adopterdla.adopterdla.auth.CustomUserDetails;
import com.jme.adopterdla.adopterdla.user.dto.ChangePasswordRequest;
import com.jme.adopterdla.adopterdla.user.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@Log4j2
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public Mono<ResponseEntity<Object>> changePassword(ChangePasswordRequest changePasswordRequest) {
        return Mono.defer(() -> {
            String userDetails = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String newPassword = changePasswordRequest.getNewPassword();
            return userRepository.findByUsername(userDetails)
                    .flatMap(user -> {
                        user.setPassword(passwordEncoder.encode(newPassword));
                        return userRepository.save(user);
                    })
                    .thenReturn(ResponseEntity.ok().build())
                    .switchIfEmpty(Mono.error(new UsernameNotFoundException("Invalid user.")))
                    .onErrorResume(AuthenticationException.class, e -> Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));
        });
    }
}
