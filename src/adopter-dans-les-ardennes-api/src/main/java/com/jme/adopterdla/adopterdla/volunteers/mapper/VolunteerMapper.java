package com.jme.adopterdla.adopterdla.volunteers.mapper;

import com.jme.adopterdla.adopterdla.common.entity.Schedule;
import com.jme.adopterdla.adopterdla.volunteers.dto.VolunteerDTO;
import com.jme.adopterdla.adopterdla.volunteers.entity.Volunteer;
import org.mapstruct.*;

import java.time.DayOfWeek;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface VolunteerMapper {
    @Mapping(target = "id", source = "volunteer.id")
    @Mapping(target = "scheduleString", source = "schedule", qualifiedByName = "scheduleToString")
    @Mapping(target = "days", expression = "java(toDayOfWeekSet(schedule.getDays()))")
    VolunteerDTO toDTO(Volunteer volunteer, Schedule schedule);

    Volunteer toEntity(VolunteerDTO volunteerDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateVolunteerFromDTO(VolunteerDTO volunteerDTO, @MappingTarget Volunteer volunteer);

    @Named("scheduleToString")
    default String scheduleToString(Schedule schedule) {
        return schedule == null ? null : schedule.toString();
    }

    @Named("toDayOfWeekSet")
    default Set<DayOfWeek> toDayOfWeekSet(Set<Integer> dayValues) {
        return dayValues.stream()
                .map(DayOfWeek::of)
                .collect(Collectors.toSet());
    }
}



