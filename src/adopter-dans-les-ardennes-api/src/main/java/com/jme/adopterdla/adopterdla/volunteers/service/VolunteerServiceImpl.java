package com.jme.adopterdla.adopterdla.volunteers.service;

import com.jme.adopterdla.adopterdla.common.service.AzureFileUploadService;
import com.jme.adopterdla.adopterdla.common.utils.AzurePersistImageUtils;
import com.jme.adopterdla.adopterdla.user.entity.User;
import com.jme.adopterdla.adopterdla.user.repository.UserRepository;
import com.jme.adopterdla.adopterdla.common.entity.Schedule;
import com.jme.adopterdla.adopterdla.common.entity.repository.ScheduleRepository;
import com.jme.adopterdla.adopterdla.utils.RandomPasswordGenerator;
import com.jme.adopterdla.adopterdla.volunteers.dto.VolunteerDTO;
import com.jme.adopterdla.adopterdla.volunteers.entity.Volunteer;
import com.jme.adopterdla.adopterdla.volunteers.mapper.VolunteerMapper;
import com.jme.adopterdla.adopterdla.volunteers.repository.VolunteerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service implementation for managing volunteers.
 */
@Service
@AllArgsConstructor
public class VolunteerServiceImpl implements VolunteerService {

    private final VolunteerRepository volunteerRepository;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final VolunteerMapper volunteerMapper;
    private final AzurePersistImageUtils azurePersistImageUtils;
    private final AzureFileUploadService azureFileUploadService;

    /**
     * Finds a volunteer by their id and returns the corresponding VolunteerDTO.
     *
     * @param id the volunteer's id
     *
     * @return the corresponding VolunteerDTO
     */
    @Override
    public Mono<VolunteerDTO> findById(Long id) {
        return volunteerRepository.findById(id)
                .flatMap(volunteer -> scheduleRepository.findById(volunteer.getScheduleId())
                        .map(schedule -> volunteerMapper.toDTO(volunteer, schedule)));
    }

    /**
     * Returns all volunteers as a Flux of VolunteerDTOs.
     *
     * @return all volunteers as a Flux of VolunteerDTOs
     */
    @Override
    public Flux<VolunteerDTO> findAll() {
        return volunteerRepository.findAll()
                .flatMap(volunteer -> scheduleRepository.findById(volunteer.getScheduleId())
                        .map(schedule -> volunteerMapper.toDTO(volunteer, schedule)));
    }

    /**
     * Saves a volunteer based on the given VolunteerDTO and returns the saved VolunteerDTO.
     * Also handles updating or inserting the associated Schedule.
     *
     * @param volunteerDTO the VolunteerDTO to be saved
     *
     * @return the saved VolunteerDTO
     */
    @Override
    public Mono<VolunteerDTO> save(VolunteerDTO volunteerDTO) {

        Mono<String> imageUrlMono = volunteerDTO.imageBase64() != null
                ? azurePersistImageUtils.saveImageData(volunteerDTO.imageBase64())
                : Mono.empty();

        return imageUrlMono.defaultIfEmpty("").flatMap(imageUrl -> {

            var schedule = Schedule.builder()
                    .days(volunteerDTO.days().stream().map(DayOfWeek::getValue).collect(Collectors.toSet()))
                    .startTimeHour(volunteerDTO.startTimeHour())
                    .startTimeMinute(volunteerDTO.startTimeMinute())
                    .endTimeHour(volunteerDTO.endTimeHour())
                    .endTimeMinute(volunteerDTO.endTimeMinute())
                    .build();

            // Determine if we need to save a new schedule or update an existing one
            Mono<Schedule> scheduleMono;
            if (volunteerDTO.scheduleId() == null) {
                scheduleMono = scheduleRepository.save(schedule);
            } else {
                scheduleMono = scheduleRepository.findById(volunteerDTO.scheduleId())
                        .doOnNext(existingSchedule -> {
                            existingSchedule.setDays(schedule.getDays());
                            existingSchedule.setStartTimeHour(schedule.getStartTimeHour());
                            existingSchedule.setStartTimeMinute(schedule.getStartTimeMinute());
                            existingSchedule.setEndTimeHour(schedule.getEndTimeHour());
                            existingSchedule.setEndTimeMinute(schedule.getEndTimeMinute());
                        })
                        .flatMap(scheduleRepository::save);
            }

            return scheduleMono.flatMap(savedSchedule -> {
                Volunteer volunteer = volunteerMapper.toEntity(volunteerDTO);
                volunteer.setScheduleId(savedSchedule.getId());

                // Determine if we need to save a new volunteer or update an existing one
                if (volunteerDTO.id() == null) {
                    User newUser = new User(volunteer.getEmail(),
                            volunteer.getEmail(),
                            volunteer.getName(),
                            RandomPasswordGenerator.generateRandomPassword(),
                            List.of("ROLE_USER"));

                    volunteer.setImageUrl(imageUrl);
                    return userRepository.save(newUser)
                            .then(volunteerRepository.save(volunteer));
                } else {
                    return volunteerRepository.findById(volunteerDTO.id())
                            .doOnNext(existingVolunteer -> {
                                if (volunteerDTO.imageBase64() != null) {
                                    // If an image is being updated, delete the old image and upload the new one.
                                    Mono.fromCallable(() -> azureFileUploadService.deleteImage(existingVolunteer.getImageUrl()))
                                            .subscribeOn(Schedulers.boundedElastic())
                                            .subscribe();
                                }
                            })
                            .doOnNext(existingVolunteer -> volunteerMapper.updateVolunteerFromDTO(volunteerDTO, existingVolunteer))
                            .flatMap(volunteer1 -> {
                                if (!volunteer1.isActive()) {
                                    return userRepository.deleteByEmail(volunteer1.getEmail())
                                            .then(Mono.defer(() -> volunteerRepository.save(volunteer1)));
                                }
                                return volunteerRepository.save(volunteer1);
                            });
                }
            }).flatMap(savedVolunteer -> scheduleRepository.findById(savedVolunteer.getScheduleId())
                    .map(savedSchedule -> volunteerMapper.toDTO(savedVolunteer, savedSchedule)));
        });
    }


    @Override
    public Mono<Void> deleteById(Long id) {
        return volunteerRepository.deleteById(id);
    }
}