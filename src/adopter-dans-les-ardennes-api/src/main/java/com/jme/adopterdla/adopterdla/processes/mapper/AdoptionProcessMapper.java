package com.jme.adopterdla.adopterdla.processes.mapper;

import com.jme.adopterdla.adopterdla.processes.dto.AdoptionProcessDTO;
import com.jme.adopterdla.adopterdla.processes.entity.AdoptionProcess;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AdoptionProcessMapper {

    AdoptionProcessDTO toAdoptionProcessDTO(AdoptionProcess adoptionProcess);

    AdoptionProcess toAdoptionProcess(AdoptionProcessDTO adoptionProcessDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAdoptionProcessFromDTO(AdoptionProcessDTO adoptionProcessDTO, @MappingTarget AdoptionProcess adoptionProcess);

}
