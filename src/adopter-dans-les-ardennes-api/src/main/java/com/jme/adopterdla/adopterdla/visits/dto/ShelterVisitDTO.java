package com.jme.adopterdla.adopterdla.visits.dto;

import lombok.Builder;

import java.time.LocalDate;

/**
 * @author Juan Marques
 * @created 21/05/2023
 */
public record ShelterVisitDTO(

        Long id,
        String name,
        String phone,
        String email,
        Long animalId,
        Long adopterIdId,
        LocalDate date,
        int hour,
        int minute
) {

    @Builder
    public ShelterVisitDTO {

    }
}
