package com.jme.adopterdla.adopterdla.processes.controller;

import com.jme.adopterdla.adopterdla.processes.dto.AdoptionProcessDTO;
import com.jme.adopterdla.adopterdla.processes.service.AdoptionProcessService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * REST controller for managing adoption processes.
 */
@RestController
@RequestMapping("/api/adoption-processes")
@AllArgsConstructor
@Tag(name = "Adoption Process", description = "Adoption Process Management")
public class AdoptionProcessController {

    private final AdoptionProcessService adoptionProcessService;

    /**
     * Create a new adoption process.
     *
     * @param adoptionProcessDTO the adoption process DTO to create
     * @return the created adoption process DTO
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new adoption process")
    public Mono<AdoptionProcessDTO> createAdoptionProcess(
            @Parameter(description = "Adoption Process DTO", required = true, schema = @Schema(implementation = AdoptionProcessDTO.class))
            @RequestBody AdoptionProcessDTO adoptionProcessDTO) {
        // Call the service to create the adoption process and return the result
        return adoptionProcessService.createAdoptionProcess(adoptionProcessDTO);
    }

    /**
     * Get an adoption process by its ID.
     *
     * @param id the ID of the adoption process to retrieve
     * @return the found adoption process DTO
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get an adoption process by ID")
    public Mono<AdoptionProcessDTO> getAdoptionProcess(
            @Parameter(description = "Adoption Process ID", required = true)
            @PathVariable Long id) {
        // Call the service to get the adoption process by ID and return the result
        return adoptionProcessService.getAdoptionProcess(id);
    }

    /**
     * Get all adoption processes.
     *
     * @return a Flux of adoption process DTOs
     */
    @GetMapping
    @Operation(summary = "Get all adoption processes")
    public Flux<AdoptionProcessDTO> getAllAdoptionProcesses() {
        // Call the service to get all adoption processes and return the result
        return adoptionProcessService.getAllAdoptionProcesses();
    }

    /**
     * Update an adoption process by its ID.
     *
     * @param id                 the ID of the adoption process to update
     * @param adoptionProcessDTO the adoption process DTO containing updated information
     * @return the updated adoption process DTO
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update an adoption process by ID")
    public Mono<AdoptionProcessDTO> updateAdoptionProcess(
            @Parameter(description = "Adoption Process ID", required = true)
            @PathVariable Long id,
            @Parameter(description = "Adoption Process DTO with updated information", required = true, schema = @Schema(implementation = AdoptionProcessDTO.class))
            @RequestBody AdoptionProcessDTO adoptionProcessDTO) {
        // Call the service to update the adoption process and return the result
        return adoptionProcessService.updateAdoptionProcess(id, adoptionProcessDTO);
    }
}
