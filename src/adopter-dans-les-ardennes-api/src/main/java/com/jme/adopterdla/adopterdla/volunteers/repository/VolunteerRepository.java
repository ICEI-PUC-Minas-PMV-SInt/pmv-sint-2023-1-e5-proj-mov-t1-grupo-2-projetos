package com.jme.adopterdla.adopterdla.volunteers.repository;

import com.jme.adopterdla.adopterdla.volunteers.entity.Volunteer;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerRepository extends ReactiveCrudRepository<Volunteer, Long> {
}
