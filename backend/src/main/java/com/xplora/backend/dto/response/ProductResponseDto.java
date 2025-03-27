package com.xplora.backend.dto.response;

import com.xplora.backend.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto extends Timestamp {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer capacity;
    private Double averageScore;
    private Integer countScores;
    private String address;
    private CityResponseDto city;
    private Category category;
    private Set<AvailabilityResponseDto> availabilitySet;
    private Set<Image> imageSet;
    private List<Feature> features;
}
