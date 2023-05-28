package com.jme.adopterdla.adopterdla.common;

import java.time.DayOfWeek;
import java.util.Set;

public record ScheduleDTO(
        Long scheduleId,
        Set<DayOfWeek> days,
        int startTimeHour,
        int startTimeMinute,
        int endTimeHour,
        int endTimeMinute,
        String scheduleString
) {
}
