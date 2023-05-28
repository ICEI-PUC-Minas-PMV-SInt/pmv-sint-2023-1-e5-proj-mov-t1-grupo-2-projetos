package com.jme.adopterdla.adopterdla;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class AbstractUtilsBaseTest {

    static final PostgreSQLContainer<?> postgreSQLContainer;

    static String adminToken;
    static String userToken;

    static {
        postgreSQLContainer =
                new PostgreSQLContainer<>(DockerImageName.parse("postgres:13"))
                        .withDatabaseName("test")
                        .withUsername("duke")
                        .withPassword("s3cret")
                        .withReuse(true);

        postgreSQLContainer.start();
    }

    private static String r2dbcUrl() {
        return String.format("r2dbc:postgresql://%s:%s/%s", postgreSQLContainer.getHost(),
                postgreSQLContainer.getMappedPort(PostgreSQLContainer.POSTGRESQL_PORT), postgreSQLContainer.getDatabaseName());
    }

    @DynamicPropertySource
    static void postgresqlProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.r2dbc.url", AbstractUtilsBaseTest::r2dbcUrl);
        registry.add("spring.r2dbc.username", postgreSQLContainer::getUsername);
        registry.add("spring.r2dbc.password", postgreSQLContainer::getPassword);
    }

    @BeforeAll
    static void beforeAll() {
        var now = new Date();
        var expirationDate = new java.util.Date(now.getTime() + 864000000);
        adminToken = Jwts.builder()
                .setSubject("admin") // Set the subject of the token to the user's email address
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .setClaims(Map.of("authorities", List.of("ROLE_ADMIN")))
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();// Sign the token with the secret key

        userToken = Jwts.builder()
                .setSubject("user") // Set the subject of the token to the user's email address
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .setClaims(Map.of("authorities", List.of("ROLE_USER")))
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();// Sign the token with the secret key
    }

    private static Key getSigningKey() {
        byte[] keyBytes = System.getenv("JWT_SECRET").getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public static String getAdminToken() {
        return adminToken;
    }

    public static String getUserToken() {
        return userToken;
    }

}
