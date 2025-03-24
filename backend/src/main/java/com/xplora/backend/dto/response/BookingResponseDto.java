package com.xplora.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.xplora.backend.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDto extends Timestamp {
    private Long id;
    private Status status;
    private AvailabilityResponseDto availability;
    private Integer quantity;
    private UserResponseDto user;
    @JsonIgnoreProperties({"availabilitySet"})
    private ProductResponseDto product;
    @JsonIgnoreProperties("userFullName")
    private ReviewResponseDto review;
}
