package com.jme.adopterdla.adopterdla.processes.dto;

import com.jme.adopterdla.adopterdla.adopters.dto.AdopterDTO;
import com.jme.adopterdla.adopterdla.animals.dto.AnimalDTO;
import com.jme.adopterdla.adopterdla.processes.utils.AdoptionProcessStatus;
import com.jme.adopterdla.adopterdla.volunteers.dto.VolunteerDTO;

import java.time.LocalDateTime;

public record AdoptionProcessDTO(
        Long id,
        String processNumber,
        Long adopterId,
        AdopterDTO adopter,
        AnimalDTO animal,
        VolunteerDTO volunteer,
        Long animalId,
        Long volunteerId,
        LocalDateTime inspectionDate,
        Boolean notifyAdopter,
        String feedbackNotes,
        String approvalNotes,
        AdoptionProcessStatus status
) {}
