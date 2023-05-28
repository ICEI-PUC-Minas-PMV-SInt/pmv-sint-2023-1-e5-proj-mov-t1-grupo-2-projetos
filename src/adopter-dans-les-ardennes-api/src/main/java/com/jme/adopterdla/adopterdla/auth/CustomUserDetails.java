package com.jme.adopterdla.adopterdla.auth;

import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Getter
public class CustomUserDetails extends User {

    private final String friendlyName;

    @Builder(builderMethodName = "customBuilder")
    public CustomUserDetails(String username, String password, String friendlyName, List<SimpleGrantedAuthority> authorities) {
        super(username, password, authorities);
        this.friendlyName = friendlyName;
    }

}

