package com.jme.adopterdla.adopterdla.animals.entity;

import com.jme.adopterdla.adopterdla.animals.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("animals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Animal{

    @Id
    private Long id;
    private String code;
    private String name;
    private String breed;
    private String arrivalDate;
    private String imageUrl;
    private Gender gender;
    private String age;
    private Boolean vaccinated;
    private Boolean castrated;
    private Boolean wormed;
    private String electronicChip;
    private String illness;
    private String notes;
    private Boolean isAvailable;
    private Boolean hasBeenAdopted;
}
