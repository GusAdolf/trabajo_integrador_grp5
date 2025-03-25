package com.xplora.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AvailabilityResponseDto {
    private Long id;
    private LocalDate date;
    private Integer remainingCapacity;
}
