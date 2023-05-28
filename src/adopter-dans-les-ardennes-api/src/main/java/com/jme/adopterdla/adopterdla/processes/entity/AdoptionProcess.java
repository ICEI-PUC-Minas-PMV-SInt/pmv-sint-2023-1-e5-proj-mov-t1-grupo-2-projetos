package com.jme.adopterdla.adopterdla.processes.entity;

import com.jme.adopterdla.adopterdla.processes.utils.AdoptionProcessStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("AdoptionProcess")
@Data
@NoArgsConstructor
public class AdoptionProcess {

    @Id
    private Long id;
    private String processNumber;
    private Long adopterId;
    private Long animalId;
    private Long volunteerId;
    private LocalDateTime inspectionDate;
    private Boolean notifyAdopter;
    private String feedbackNotes;
    private String approvalNotes;
    private AdoptionProcessStatus status;

}
