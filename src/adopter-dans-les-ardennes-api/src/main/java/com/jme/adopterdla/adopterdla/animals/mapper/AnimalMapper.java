package com.jme.adopterdla.adopterdla.animals.mapper;

import com.jme.adopterdla.adopterdla.animals.dto.AnimalDTO;
import com.jme.adopterdla.adopterdla.animals.entity.Animal;
import org.mapstruct.*;

import java.util.Optional;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AnimalMapper {

    AnimalDTO toAnimalDTO(Animal animal);

    Animal toAnimalUpdate(AnimalDTO animalDto, @MappingTarget Animal animal);

    Animal toAnimal(AnimalDTO animalDto);

}
