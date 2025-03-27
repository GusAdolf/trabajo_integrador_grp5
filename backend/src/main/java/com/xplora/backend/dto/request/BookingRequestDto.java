package com.xplora.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookingRequestDto {
    @NotNull
    private Long product_id;

    @NotNull
    private Long availability_id;

    @NotNull
    private Integer quantity;
}
