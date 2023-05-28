package com.jme.adopterdla.adopterdla.animals.controller;

import com.jme.adopterdla.adopterdla.animals.dto.AnimalDTO;
import com.jme.adopterdla.adopterdla.animals.dto.AnimalNameAndIdDTO;
import com.jme.adopterdla.adopterdla.animals.service.AnimalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/animals")
@RequiredArgsConstructor
@Tag(name = "Animal", description = "API for Animal operations")
@Log4j2
public class AnimalController {

    private final AnimalService animalService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new animal")
    @ApiResponse(responseCode = "201", description = "Animal created", content = @Content(schema = @Schema(implementation = AnimalDTO.class)))
    public Mono<AnimalDTO> createAnimal(@RequestBody AnimalDTO animalDTO) {
        log.info("Animal request {}", animalDTO);
        return animalService.createAnimal(animalDTO);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an animal by ID")
    @ApiResponse(responseCode = "200", description = "Animal found", content = @Content(schema = @Schema(implementation = AnimalDTO.class)))
    @ApiResponse(responseCode = "404", description = "Animal not found")
    public Mono<AnimalDTO> getAnimal(@Parameter(description = "Animal ID") @PathVariable Long id) {
        return animalService.getAnimal(id);
    }

    @GetMapping
    @Operation(summary = "Get all animals")
    @ApiResponse(responseCode = "200", description = "List of animals", content = @Content(array = @ArraySchema(schema = @Schema(implementation = AnimalDTO.class))))
    public Flux<AnimalDTO> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @GetMapping("/available")
    @Operation(summary = "Get all animals by availability")
    @ApiResponse(responseCode = "200", description = "List of animals", content = @Content(array = @ArraySchema(schema = @Schema(implementation = AnimalDTO.class))))
    public Flux<AnimalDTO> getAllAnimalsByIsAvailable(@Parameter(description = "Availability status") @RequestParam boolean isAvailable) {
        return animalService.getAllAnimalsByIsAvailable(isAvailable);
    }

    @GetMapping("/names-ids")
    @Operation(summary = "Get animal names and IDs by availability")
    @ApiResponse(responseCode = "200", description = "List of animal names and IDs")
    public Flux<AnimalNameAndIdDTO> getAvailableAnimalNamesAndIds() {
        return animalService.getAvailableAnimalNamesAndIds();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete an animal by ID")
    @ApiResponse(responseCode = "204", description = "Animal deleted")
    @ApiResponse(responseCode = "404", description = "Animal not found")
    public Mono<Void> deleteAnimal(@Parameter(description = "Animal ID") @PathVariable Long id) {
        return animalService.deleteAnimal(id);
    }
}
