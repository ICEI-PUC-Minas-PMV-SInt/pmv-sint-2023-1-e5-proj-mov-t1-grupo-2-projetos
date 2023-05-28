package com.jme.adopterdla.adopterdla.user.controller;

import com.jme.adopterdla.adopterdla.user.dto.ChangePasswordRequest;
import com.jme.adopterdla.adopterdla.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/user")
@Log4j2
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/change-password")
    @Operation(summary = "Changes the password of a user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password changed successfully."),
            @ApiResponse(responseCode = "401", description = "Authentication failed, invalid credentials.")
    })
    public Mono<ResponseEntity<Object>> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        return userService.changePassword(changePasswordRequest);
    }

}
