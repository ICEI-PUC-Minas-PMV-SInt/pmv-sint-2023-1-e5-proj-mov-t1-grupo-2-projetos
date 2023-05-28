package com.jme.adopterdla.adopterdla.auth.controller;

import com.jme.adopterdla.adopterdla.auth.dto.JwtResponse;
import com.jme.adopterdla.adopterdla.auth.dto.LoginRequest;
import com.jme.adopterdla.adopterdla.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

/**
 * The AuthController class handles authentication related HTTP requests.
 */
@RestController
@RequestMapping("api/auth")
@Log4j2
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticates a user and generates a JWT token for further requests.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authentication successful."),
            @ApiResponse(responseCode = "401", description = "Authentication failed, invalid credentials.")
    })
    public Mono<ResponseEntity<JwtResponse>> login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/refresh")
    @Operation(summary = "Generates a new JWT using the provided refresh token.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "JWT refreshed successfully."),
            @ApiResponse(responseCode = "401", description = "Invalid refresh token.")
    })
    public Mono<ResponseEntity<JwtResponse>> refresh(@RequestParam("refreshToken") String refreshToken) {
        return authService.refresh(refreshToken);
    }
}