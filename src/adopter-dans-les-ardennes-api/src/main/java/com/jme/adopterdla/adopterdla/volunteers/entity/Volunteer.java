package com.jme.adopterdla.adopterdla.volunteers.entity;

import com.jme.adopterdla.adopterdla.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

@EqualsAndHashCode(callSuper = true)
@Table("volunteers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Volunteer extends BaseEntity {

    private boolean active;
    private String notes;
    private Long scheduleId;
}
