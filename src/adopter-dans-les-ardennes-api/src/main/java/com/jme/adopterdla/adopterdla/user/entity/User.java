package com.jme.adopterdla.adopterdla.user.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@Table("users")
@Data
public class User {

    @Id
    private Long id;
    private String username;
    private String password;
    private String name;
    private String email;
    private List<String> roles;

    public User(String username, String email, String name, String password, List<String> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.name = name;
        this.email = email;
    }
}
