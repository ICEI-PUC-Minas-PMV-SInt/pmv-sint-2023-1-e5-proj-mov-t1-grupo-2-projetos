package com.jme.adopterdla.adopterdla.auth.service;

import com.jme.adopterdla.adopterdla.auth.CustomUserDetails;
import com.jme.adopterdla.adopterdla.user.dto.ChangePasswordRequest;
import com.jme.adopterdla.adopterdla.auth.dto.JwtResponse;
import com.jme.adopterdla.adopterdla.auth.dto.LoginRequest;
import com.jme.adopterdla.adopterdla.user.repository.UserRepository;
import com.jme.adopterdla.adopterdla.configs.security.JwtAuthenticationManager;
import com.jme.adopterdla.adopterdla.configs.security.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@Log4j2
public class AuthService {

    private final JwtAuthenticationManager authenticationManager;
    private final ReactiveUserDetailsService userDetailService;
    private final JwtService jwtService;

    public AuthService(JwtAuthenticationManager authenticationManager, ReactiveUserDetailsService userDetailService,JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
        this.jwtService = jwtService;
    }

    public Mono<ResponseEntity<JwtResponse>> login(LoginRequest loginRequest) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()))
                .flatMap(authentication -> userDetailService.findByUsername(authentication.getName())
                        .map(userDetails -> {
                            var token = jwtService.generateToken(authentication, false);
                            var refreshToken = jwtService.generateToken(authentication, true);
                            return ResponseEntity.ok(new JwtResponse(token, refreshToken, ((CustomUserDetails) userDetails).getFriendlyName(),
                                    userDetails.getAuthorities().stream()
                                            .map(GrantedAuthority::getAuthority)
                                            .toList()));
                        }))
                .switchIfEmpty(Mono.error(new UsernameNotFoundException("Invalid username or password.")))
                .onErrorResume(AuthenticationException.class, e -> Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));
    }
    public Mono<ResponseEntity<JwtResponse>> refresh(String refreshToken) {
        try {
            jwtService.validateToken(refreshToken);
            String username = jwtService.extractUsername(refreshToken);
            return userDetailService.findByUsername(username)
                    .map(userDetails -> (CustomUserDetails) userDetails)
                    .flatMap(customUserDetails -> {
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        String newAccessToken = jwtService.generateToken(authentication, false);
                        String newRefreshToken = jwtService.generateToken(authentication, true);
                        return Mono.just(ResponseEntity.ok(new JwtResponse(newAccessToken, newRefreshToken, customUserDetails.getFriendlyName(), customUserDetails.getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .toList())));
                    });
        } catch (
                ExpiredJwtException |
                UnsupportedJwtException |
                MalformedJwtException |
                SignatureException |
                IllegalArgumentException jwtException) {
            log.error("Invalid refresh token: {}", jwtException.getMessage());
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
        }
    }
}