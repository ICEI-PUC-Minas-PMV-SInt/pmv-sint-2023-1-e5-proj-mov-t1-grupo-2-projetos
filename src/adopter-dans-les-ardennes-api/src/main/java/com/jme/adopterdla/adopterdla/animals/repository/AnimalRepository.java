package com.jme.adopterdla.adopterdla.animals.repository;

import com.jme.adopterdla.adopterdla.animals.dto.AnimalNameAndIdDTO;
import com.jme.adopterdla.adopterdla.animals.entity.Animal;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface AnimalRepository extends ReactiveCrudRepository<Animal, Long> {


    Flux<Animal> findAllByIsAvailable(boolean isAvailable);

    @Query("""
            SELECT CONCAT(name, ' - ', code) AS label, id AS value
            FROM animals
            WHERE is_available = true
                """)
    Flux<AnimalNameAndIdDTO> findNameAndIdByIsAvailable();
}
