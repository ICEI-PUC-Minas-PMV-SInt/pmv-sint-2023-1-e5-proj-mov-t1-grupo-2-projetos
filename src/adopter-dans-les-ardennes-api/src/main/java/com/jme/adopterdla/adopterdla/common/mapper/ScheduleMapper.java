package com.jme.adopterdla.adopterdla.common.mapper;

import com.jme.adopterdla.adopterdla.common.ScheduleDTO;
import com.jme.adopterdla.adopterdla.common.entity.Schedule;
import org.mapstruct.*;

import java.time.DayOfWeek;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ScheduleMapper {

    @Mapping(target = "scheduleId", source = "id")
    @Mapping(target = "days", expression = "java(toDayOfWeekSet(schedule.getDays()))")
    @Mapping(target = "scheduleString", expression = "java(schedule.toString())")
    ScheduleDTO toDTO(Schedule schedule);

    @Mapping(target = "id", source = "scheduleId")
    @Mapping(target = "days", source = "days", qualifiedByName = "dayOfWeekToValue")
    Schedule toEntity(ScheduleDTO scheduleDTO);

    @Mappings({
            @Mapping(target = "days", source = "days", qualifiedByName = "dayOfWeekToValue")
    })
    void updateScheduleFromDTO(ScheduleDTO scheduleDTO, @MappingTarget Schedule schedule);

    @Named("dayOfWeekToValue")
    default Set<Integer> dayOfWeekToValue(Set<DayOfWeek> days) {
        return days.stream().map(DayOfWeek::getValue).collect(Collectors.toSet());
    }

    @Named("toDayOfWeekSet")
    default Set<DayOfWeek> toDayOfWeekSet(Set<Integer> dayValues) {
        return dayValues.stream()
                .map(DayOfWeek::of)
                .collect(Collectors.toSet());
    }
}
