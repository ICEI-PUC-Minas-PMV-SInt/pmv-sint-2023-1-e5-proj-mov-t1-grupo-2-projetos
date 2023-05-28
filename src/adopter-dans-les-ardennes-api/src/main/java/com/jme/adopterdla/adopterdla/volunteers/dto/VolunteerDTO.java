package com.jme.adopterdla.adopterdla.volunteers.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.DayOfWeek;
import java.util.Set;

public record VolunteerDTO(
        Long id,
        String notes,
        Long scheduleId,
        Set<DayOfWeek> days,
        int startTimeHour,
        int startTimeMinute,
        int endTimeHour,
        int endTimeMinute,
        @NotBlank String name,
        String imageUrl,
        String address,
        String phone,
        @Email @Nullable String email,
        String scheduleString,
        boolean active,
        String imageBase64
) {
}

