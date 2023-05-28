package com.jme.adopterdla.adopterdla.processes.service;

import com.jme.adopterdla.adopterdla.processes.dto.AdoptionProcessDTO;
import com.jme.adopterdla.adopterdla.processes.entity.AdoptionProcess;
import com.jme.adopterdla.adopterdla.processes.mapper.AdoptionProcessMapper;
import com.jme.adopterdla.adopterdla.processes.repository.AdoptionProcessRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service implementation for managing adoption processes.
 */
@Service
@AllArgsConstructor
public class AdoptionProcessServiceImpl implements AdoptionProcessService {

    private final AdoptionProcessRepository adoptionProcessRepository;

    private final AdoptionProcessMapper adoptionProcessMapper;

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<AdoptionProcessDTO> createAdoptionProcess(AdoptionProcessDTO adoptionProcessDTO) {
        // Convert the DTO to an entity
        AdoptionProcess adoptionProcess = adoptionProcessMapper.toAdoptionProcess(adoptionProcessDTO);

        // Save the entity and convert it back to a DTO before returning
        return adoptionProcessRepository.save(adoptionProcess)
                .map(adoptionProcessMapper::toAdoptionProcessDTO);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<AdoptionProcessDTO> getAdoptionProcess(Long id) {
        // Find the entity by ID and convert it to a DTO before returning
        return adoptionProcessRepository.findById(id)
                .map(adoptionProcessMapper::toAdoptionProcessDTO);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Flux<AdoptionProcessDTO> getAllAdoptionProcesses() {
        // Retrieve all entities and convert each one to a DTO before returning
        return adoptionProcessRepository.findAll()
                .map(adoptionProcessMapper::toAdoptionProcessDTO);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<AdoptionProcessDTO> updateAdoptionProcess(Long id, AdoptionProcessDTO adoptionProcessDTO) {
        // Find the existing entity by ID
        return adoptionProcessRepository.findById(id)
                .flatMap(existingAdoptionProcess -> {
                    // Update the existing entity with non-null fields from the DTO
                    adoptionProcessMapper.updateAdoptionProcessFromDTO(adoptionProcessDTO, existingAdoptionProcess);

                    // Save the updated entity and convert it back to a DTO before returning
                    return adoptionProcessRepository.save(existingAdoptionProcess);
                })
                .map(adoptionProcessMapper::toAdoptionProcessDTO)
                .switchIfEmpty(Mono.error(new RuntimeException("AdoptionProcess not found")));
    }

}