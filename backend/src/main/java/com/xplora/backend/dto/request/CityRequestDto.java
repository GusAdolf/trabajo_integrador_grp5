package com.xplora.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CityRequestDto {
    @NotBlank
    @Size(min = 3, max = 100, message = "El nombre de la ciudad es mínimo 3 caracteres y máximo 100")
    private String name;

    @NotBlank
    @Size(min = 3, max = 100, message = "El país es mínimo 3 caracteres y máximo 100")
    private String country;
}
