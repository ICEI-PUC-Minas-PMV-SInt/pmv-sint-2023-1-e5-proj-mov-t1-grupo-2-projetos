package com.jme.adopterdla.adopterdla.auth;

import com.jme.adopterdla.adopterdla.AbstractUtilsBaseTest;
import com.jme.adopterdla.adopterdla.auth.dto.LoginRequest;
import com.jme.adopterdla.adopterdla.user.entity.User;
import com.jme.adopterdla.adopterdla.user.repository.UserRepository;
import com.jme.adopterdla.adopterdla.configs.security.JwtAuthenticationManager;
import com.jme.adopterdla.adopterdla.configs.security.service.JwtService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.List;

import static io.restassured.RestAssured.given;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthControllerTest extends AbstractUtilsBaseTest {

    @Autowired
    private JwtAuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private static final String BASE_URL = "http://localhost:8080/api/auth";

    @Test
    @Order(1)
    public void givenValidCredentials_whenLogin_thenStatus200() {

        this.userRepository.save(new User("username", "adopt@adopterdla.com", "John", "password", List.of("ROLE_USER"))).block();

        var request = new LoginRequest("username", "password");

        given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .when()
                .post(BASE_URL + "/login")
                .then()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    @Order(2)
    public void givenInvalidCredentials_whenLogin_thenStatus401() {
        LoginRequest request = new LoginRequest("invalid_username", "invalid_password");

        given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .when()
                .post(BASE_URL + "/login")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @Order(3)
    public void givenValidRefreshToken_whenRefresh_thenStatus200() {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("username", "password")).block();
        String refreshToken = jwtService.generateToken(authentication, true);

        given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .post(BASE_URL + "/refresh?refreshToken=" + refreshToken)
                .then()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    public void givenInvalidRefreshToken_whenRefresh_thenStatus401() {
        given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .post(BASE_URL + "/refresh?refreshToken=eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIiw" +
                        "iUk99VU0VSIl0sInN1YiI6ImFkbWluIiwiaWF0IjoxNjgxMTQwNTEzLCJleHAiOjE2ODExNTEzMTN9.D47ojBek_5UBsYx8guLDprl3o0eDS0gP2ytGJ0pYqCUFtxOzcj" +
                        "ZsBDw5l9Z-6zwjaxvDzvf5hYfkAt-UiDutbw")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }
}
