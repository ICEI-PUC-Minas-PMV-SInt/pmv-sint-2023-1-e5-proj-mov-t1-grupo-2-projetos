package com.jme.adopterdla.adopterdla.animals.dto;

import com.jme.adopterdla.adopterdla.animals.enums.Gender;
import lombok.Builder;

public record AnimalDTO(

        Long id,
        String code,
        String name,
        String breed,
        String age,
        String arrivalDate,
        String imageUrl,
        Gender gender,
        Boolean vaccinated,
        Boolean castrated,
        Boolean wormed,
        String electronicChip,
        String illness,
        String notes,
        Boolean isAvailable,
        Boolean hasBeenAdopted,
        String imageBase64
) {

    @Builder
    public AnimalDTO {

    }
}
