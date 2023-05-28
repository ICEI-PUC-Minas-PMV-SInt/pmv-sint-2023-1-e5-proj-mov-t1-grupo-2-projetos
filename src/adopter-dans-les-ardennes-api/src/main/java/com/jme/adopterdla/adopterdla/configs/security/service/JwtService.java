package com.jme.adopterdla.adopterdla.configs.security.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

/**
 * This class provides utility methods for working with JSON Web Tokens (JWT).
 */
@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration.minutes}")
    private long jwtExpirationInMinutes;

    /**
     * Get the key to be used for signing JWTs.
     *
     * @return The signing key.
     */
    private Key getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generate a JWT for the given authentication.
     *
     * @param authentication The authentication for which to generate a token.
     * @param refreshToken   Whether the token is a refresh token or not.
     * @return The generated token.
     */
    public String generateToken(Authentication authentication, boolean refreshToken) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList());
        var user = (User) authentication.getPrincipal();
        return createToken(claims, user.getUsername(), refreshToken);
    }

    /**
     * Create a JWT with the given claims and subject.
     *
     * @param claims       The claims to include in the token.
     * @param subject      The subject of the token.
     * @param refreshToken Whether the token is a refresh token or not.
     * @return The generated token.
     */
    private String createToken(Map<String, Object> claims, String subject, boolean refreshToken) {
        Date now = new Date();
        Date expiration;
        if (refreshToken) {
            expiration = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours in milliseconds
        } else {
            expiration = new Date(now.getTime() + jwtExpirationInMinutes * 60 * 1000);
        }
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Validate a JWT.
     *
     * @param token The token to validate.
     * @return {@code true} if the token is valid, {@code false} otherwise.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }

    }

    /**
     * Extract a claim from a JWT.
     *
     * @param token          The token from which to extract the claim.
     * @param claimsResolver The function to use to extract the claim.
     * @param <T>            The type of the claim.
     * @return The extracted claim.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extract all claims from a JWT.
     *
     * @param token The token from which to extract the claims.
     * @return The extracted claims.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }

    /**
     * Extracts the username from the given JWT token.
     *
     * @param token the JWT token to extract the username from.
     * @return the username extracted from the token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the expiration date from the given JWT token.
     *
     * @param token the JWT token to extract the expiration date from.
     * @return the expiration date extracted from the token.
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Checks whether the given JWT token is expired or not.
     *
     * @param token the JWT token to check for expiration.
     * @return true if the token is expired, false otherwise.
     */
    public boolean isTokenExpired(String token) {
        try {
            final Date expiration = extractExpiration(token);
            return expiration.before(new Date());
        } catch (JwtException e) {
            return true;
        }
    }

    /**
     * Extracts the authorities from the given JWT token.
     *
     * @param token the JWT token to extract the authorities from.
     * @return a list of SimpleGrantedAuthority objects representing the authorities in the token.
     */
    public List<SimpleGrantedAuthority> extractAuthorities(String token) {
        Claims claims = extractAllClaims(token);
        return ((List<?>) claims.get("authorities"))
                .stream()
                .map(authority -> (String) authority)
                .map(SimpleGrantedAuthority::new)
                .toList();
    }
}