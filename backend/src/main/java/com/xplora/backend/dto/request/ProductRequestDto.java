package com.xplora.backend.dto.request;

import com.xplora.backend.entity.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductRequestDto {
    @NotBlank
    @Size(min = 3, message = "El nombre es de mínimo 3 caracteres")
    private String name;

    @Size(max = 1000, message = "La descripción es de máximo 1000 caracteres")
    private String description;

    @NotNull
    @DecimalMin(value = "0.0")
    private Double price;

    @NotNull
    @Min(value = 1, message = "La capacidad es de mínimo 1 persona")
    private Integer capacity;

    @NotBlank
    @Size(min = 3, message = "El dirección es de mínimo 3 caracteres")
    private String address;

    @NotNull
    private Integer city_id;

    @NotNull
    @Size(min = 5, message = "El producto debe tener almenos 5 imágenes")
    private Set<Image> imageSet;

    @NotNull
    private Long category_id;

    @NotNull
    @Size(min = 1, message = "El producto debe tener almenos 1 caracteristica")
    private List<Long> features_ids;

    @NotNull
    @Size(min = 1, message = "El producto debe tener almenos 1 fecha disponible")
    private Set<@Valid AvailabilityRequestDto> availabilitySet;
}
