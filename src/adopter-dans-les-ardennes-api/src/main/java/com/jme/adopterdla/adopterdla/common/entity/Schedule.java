package com.jme.adopterdla.adopterdla.common.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Table("Schedules")
public class Schedule {

    @Id
    private Long id;
    private LocalDate scheduleDate;
    private Set<Integer> days;
    private int startTimeHour;
    private int startTimeMinute;
    private int endTimeHour;
    private int endTimeMinute;

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Days: ");
        for (Integer dayValue : days) {
            sb.append(DayOfWeek.of(dayValue).toString(), 0, 3).append(", ");
        }
        sb.deleteCharAt(sb.length() - 2);
        sb.append("from ")
                .append(String.format("%02d:%02d", startTimeHour, startTimeMinute))
                .append(" to ")
                .append(String.format("%02d:%02d", endTimeHour, endTimeMinute));
        return sb.toString();
    }
}
