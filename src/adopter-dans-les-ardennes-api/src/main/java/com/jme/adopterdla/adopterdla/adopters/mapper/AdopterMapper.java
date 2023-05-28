package com.jme.adopterdla.adopterdla.adopters.mapper;

import com.jme.adopterdla.adopterdla.adopters.dto.AdopterDTO;
import com.jme.adopterdla.adopterdla.adopters.entity.Adopter;
import org.mapstruct.*;

@Mapper(nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AdopterMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "imageUrl", target = "imageUrl"),
            @Mapping(source = "address", target = "address"),
            @Mapping(source = "phone", target = "phone"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "processNumber", target = "processNumber"),
           // @Mapping(source = "adoptedAnimals", target = "adoptedAnimals")
    })
    AdopterDTO toAdopterDTO(Adopter adopter);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "imageUrl", target = "imageUrl"),
            @Mapping(source = "address", target = "address"),
            @Mapping(source = "phone", target = "phone"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "processNumber", target = "processNumber"),
            //@Mapping(source = "adoptedAnimals", target = "adoptedAnimals")
    })
    Adopter toAdopter(AdopterDTO adopterDto);

}
