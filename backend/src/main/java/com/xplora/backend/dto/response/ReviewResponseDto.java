package com.xplora.backend.dto.response;

import com.xplora.backend.entity.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto extends Timestamp {
    private Long id;
    private Integer score;
    private String comment;
    private String userFullName;
    //private ProductResponseDto product;
    //private BookingResponseDto booking;
}
