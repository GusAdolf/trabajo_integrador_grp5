package com.xplora.backend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReviewRequestDto {
    @NotNull
    @Max(value = 5, message = "Máximo 5 estrellas")
    @Min(value = 1, message = "Mínimo 1 estrella") // entero??
    private Integer score;

    @Size(max = 1000)
    private String comment;
}
