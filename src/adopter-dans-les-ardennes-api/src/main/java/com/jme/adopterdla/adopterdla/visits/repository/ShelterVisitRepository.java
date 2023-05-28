package com.jme.adopterdla.adopterdla.visits.repository;

import com.jme.adopterdla.adopterdla.visits.entity.ShelterVisit;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterVisitRepository extends ReactiveCrudRepository<ShelterVisit, Long> {
}
