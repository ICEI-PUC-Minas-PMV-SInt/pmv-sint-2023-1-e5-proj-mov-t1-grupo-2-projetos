package com.jme.adopterdla.adopterdla.visits.service;

import com.jme.adopterdla.adopterdla.visits.dto.ShelterVisitDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ShelterVisitService {
    Mono<ShelterVisitDTO> findById(Long id);

    Flux<ShelterVisitDTO> findAll();

    Mono<ShelterVisitDTO> save(ShelterVisitDTO shelterVisitDTO);

    Mono<Void> deleteById(Long id);
}
