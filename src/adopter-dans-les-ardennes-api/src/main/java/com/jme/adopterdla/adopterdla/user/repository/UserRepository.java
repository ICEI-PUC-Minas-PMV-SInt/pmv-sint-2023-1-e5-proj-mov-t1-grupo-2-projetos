package com.jme.adopterdla.adopterdla.user.repository;

import com.jme.adopterdla.adopterdla.user.entity.User;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Long> {
    Mono<User> findByUsername(String username);


    Mono<Void> deleteByEmail(String email);
}