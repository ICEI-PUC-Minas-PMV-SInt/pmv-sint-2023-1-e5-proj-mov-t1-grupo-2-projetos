package com.jme.adopterdla.adopterdla.common.entity.repository;

import com.jme.adopterdla.adopterdla.common.entity.Schedule;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository  extends ReactiveCrudRepository<Schedule, Long> {
}
