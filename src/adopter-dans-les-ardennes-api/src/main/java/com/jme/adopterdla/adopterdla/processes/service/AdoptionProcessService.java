package com.jme.adopterdla.adopterdla.processes.service;

import com.jme.adopterdla.adopterdla.processes.dto.AdoptionProcessDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service interface for managing adoption processes.
 */
public interface AdoptionProcessService {

    /**
     * Create a new adoption process.
     *
     * @param adoptionProcessDTO the adoption process DTO to create
     * @return the created adoption process DTO
     */
    Mono<AdoptionProcessDTO> createAdoptionProcess(AdoptionProcessDTO adoptionProcess);

    /**
     * Get an adoption process by its ID.
     *
     * @param id the ID of the adoption process to retrieve
     * @return the found adoption process DTO
     */
    Mono<AdoptionProcessDTO> getAdoptionProcess(Long id);

    /**
     * Get all adoption processes.
     *
     * @return a Flux of adoption process DTOs
     */
    Flux<AdoptionProcessDTO> getAllAdoptionProcesses();

    /**
     * Update an adoption process by its ID.
     *
     * @param id               the ID of the adoption process to update
     * @param adoptionProcessDTO the adoption process DTO containing updated information
     * @return the updated adoption process DTO
     */
    Mono<AdoptionProcessDTO> updateAdoptionProcess(Long id, AdoptionProcessDTO adoptionProcess);
}
