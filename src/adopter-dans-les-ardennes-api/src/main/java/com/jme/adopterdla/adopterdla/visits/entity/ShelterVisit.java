package com.jme.adopterdla.adopterdla.visits.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("shelter_visit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShelterVisit {

    @Id
    private Long id;
    private Long scheduleId;
    private Long animalId;
    private Long adopterId;
}
