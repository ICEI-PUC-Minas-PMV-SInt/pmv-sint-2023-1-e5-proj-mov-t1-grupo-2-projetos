package com.jme.adopterdla.adopterdla.visits.service;

import com.jme.adopterdla.adopterdla.adopters.entity.Adopter;
import com.jme.adopterdla.adopterdla.adopters.repository.AdopterRepository;
import com.jme.adopterdla.adopterdla.common.entity.Schedule;
import com.jme.adopterdla.adopterdla.common.entity.repository.ScheduleRepository;
import com.jme.adopterdla.adopterdla.visits.dto.ShelterVisitDTO;
import com.jme.adopterdla.adopterdla.visits.entity.ShelterVisit;
import com.jme.adopterdla.adopterdla.visits.repository.ShelterVisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.DayOfWeek;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class ShelterVisitServiceImpl implements ShelterVisitService {

    private final ShelterVisitRepository shelterVisitRepository;
    private final AdopterRepository adopterRepository;
    private final ScheduleRepository scheduleRepository;

    /**
     * Find a ShelterVisit by id.
     *
     * @param id The id of the ShelterVisit to find.
     *
     * @return A Mono of the ShelterVisitDTO.
     */
    @Override
    public Mono<ShelterVisitDTO> findById(Long id) {
        return shelterVisitRepository.findById(id)
                .flatMap(this::toDTO);
    }

    /**
     * Find all ShelterVisits.
     *
     * @return A Flux of all ShelterVisitDTOs.
     */
    @Override
    public Flux<ShelterVisitDTO> findAll() {
        return shelterVisitRepository.findAll()
                .flatMap(this::toDTO);
    }

    /**
     * Save a ShelterVisit.
     *
     * @param shelterVisitDTO The ShelterVisitDTO to save.
     *
     * @return A Mono of the saved ShelterVisitDTO.
     */
    @Override
    public Mono<ShelterVisitDTO> save(ShelterVisitDTO shelterVisitDTO) {
        return Mono.justOrEmpty(shelterVisitDTO.id())
                .flatMap(shelterVisitRepository::findById)
                .defaultIfEmpty(new ShelterVisit())
                .zipWhen(shelterVisit -> shelterVisit.getAdopterId() != null ?
                        adopterRepository.findById(shelterVisitDTO.adopterIdId()) :
                        adopterRepository.findByEmail(shelterVisitDTO.email())
                                .defaultIfEmpty(new Adopter()))
                .flatMap(tuple -> {
                    ShelterVisit shelterVisit = tuple.getT1();
                    Adopter adopter = tuple.getT2();

                    adopter.setName(shelterVisitDTO.name());
                    adopter.setEmail(shelterVisitDTO.email());
                    adopter.setPhone(shelterVisitDTO.phone());
                    shelterVisit.setAnimalId(shelterVisitDTO.animalId());

                    Mono<Schedule> scheduleMono;
                    if (shelterVisit.getScheduleId() != null) {
                        scheduleMono = scheduleRepository.findById(shelterVisit.getScheduleId());
                    } else {
                        scheduleMono = Mono.just(new Schedule());
                    }

                    return Mono.zip(
                            adopterRepository.save(adopter).doOnNext(adopter1 -> shelterVisit.setAdopterId(adopter1.getId())),
                            scheduleMono
                                    .doOnNext(schedule -> {
                                        schedule.setScheduleDate(shelterVisitDTO.date());
                                        schedule.setDays(Collections.singleton(DayOfWeek.of(shelterVisitDTO.date().getDayOfWeek().getValue()).getValue()));
                                        schedule.setStartTimeHour(shelterVisitDTO.hour());
                                        schedule.setEndTimeMinute(shelterVisitDTO.minute());
                                    })
                                    .flatMap(scheduleRepository::save)
                                    .doOnNext(schedule -> shelterVisit.setScheduleId(schedule.getId())),
                            Mono.just(shelterVisit)
                    );
                })
                .flatMap(tuple -> shelterVisitRepository.save(tuple.getT3()))
                .flatMap(this::toDTO);
    }


    /**
     * Delete a ShelterVisit by id.
     *
     * @param id The id of the ShelterVisit to delete.
     *
     * @return A Mono of void indicating completion of the deletion operation.
     */
    @Override
    public Mono<Void> deleteById(Long id) {
        return shelterVisitRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("ShelterVisit not found")))
                .flatMap(shelterVisit ->
                        shelterVisitRepository.deleteById(id).then(
                                scheduleRepository.deleteById(shelterVisit.getScheduleId()))
                );
    }


    /**
     * Convert a ShelterVisit entity to a ShelterVisitDTO.
     *
     * @param shelterVisit The ShelterVisit entity to convert.
     *
     * @return A Mono of the converted ShelterVisitDTO.
     */
    private Mono<ShelterVisitDTO> toDTO(ShelterVisit shelterVisit) {
        return Mono.just(shelterVisit)
                .zipWith(adopterRepository.findById(shelterVisit.getAdopterId()))
                .zipWith(scheduleRepository.findById(shelterVisit.getScheduleId()))
                .map(tuple -> {
                    ShelterVisit shelter = tuple.getT1().getT1();
                    Adopter adopter = tuple.getT1().getT2();
                    Schedule schedule = tuple.getT2();

                    return ShelterVisitDTO.builder()
                            .id(shelter.getId())
                            .name(adopter.getName())
                            .phone(adopter.getPhone())
                            .email(adopter.getEmail())
                            .adopterIdId(adopter.getId())
                            .animalId(shelter.getAnimalId())
                            .date(schedule.getScheduleDate())
                            .hour(schedule.getStartTimeHour())
                            .minute(schedule.getEndTimeMinute())
                            .build();
                });
    }

}

