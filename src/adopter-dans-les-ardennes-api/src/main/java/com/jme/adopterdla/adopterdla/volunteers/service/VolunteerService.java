package com.jme.adopterdla.adopterdla.volunteers.service;

import com.jme.adopterdla.adopterdla.volunteers.dto.VolunteerDTO;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface VolunteerService {
    Mono<VolunteerDTO> findById(Long id);

    Flux<VolunteerDTO> findAll();

    Mono<VolunteerDTO> save(VolunteerDTO volunteerDTO);

    Mono<Void> deleteById(Long id);
}
