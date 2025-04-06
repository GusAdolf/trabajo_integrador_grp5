package com.xplora.backend.dto.request;

import jakarta.validation.constraints.Min;
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
    @Min(value = 1, message = "La cantidad de personas para la reservación es de mínimo 1 persona")
    private Integer quantity;
}
