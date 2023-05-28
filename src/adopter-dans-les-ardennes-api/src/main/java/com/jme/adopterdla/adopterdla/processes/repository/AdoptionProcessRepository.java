package com.jme.adopterdla.adopterdla.processes.repository;

import com.jme.adopterdla.adopterdla.processes.entity.AdoptionProcess;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptionProcessRepository extends ReactiveCrudRepository<AdoptionProcess, Long> {
}
