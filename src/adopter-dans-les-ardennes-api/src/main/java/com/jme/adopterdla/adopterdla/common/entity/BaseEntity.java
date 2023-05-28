package com.jme.adopterdla.adopterdla.common.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity {

    @Id
    private Long id;
    private String name;
    private String imageUrl;
    private String address;
    private String phone;
    private String email;
}
