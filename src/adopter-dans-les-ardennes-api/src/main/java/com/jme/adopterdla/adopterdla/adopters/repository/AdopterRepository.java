package com.jme.adopterdla.adopterdla.adopters.repository;

import com.jme.adopterdla.adopterdla.adopters.entity.Adopter;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface AdopterRepository extends ReactiveCrudRepository<Adopter, Long> {

    Mono<Adopter> findByEmail(String email);
}

