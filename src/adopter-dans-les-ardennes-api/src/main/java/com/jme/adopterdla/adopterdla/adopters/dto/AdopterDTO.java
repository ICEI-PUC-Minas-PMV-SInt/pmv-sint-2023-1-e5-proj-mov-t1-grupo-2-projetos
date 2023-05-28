package com.jme.adopterdla.adopterdla.adopters.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

public record AdopterDTO(Long id,
                         @NotBlank String name,
                         String imageUrl,
                         String address,
                         String phone,
                         @Email @Nullable String email,
                         String processNumber) {

    @Builder
    public AdopterDTO {

    }

}
