package com.xplora.backend.service;

import com.xplora.backend.dto.response.AvailabilityResponseDto;
import com.xplora.backend.entity.Availability;
import com.xplora.backend.entity.Product;

import java.util.List;

public interface IAvailabilityService {
    List<AvailabilityResponseDto> getAvailabilitiesByProductId(Long productId);
    Availability updateAvailability(Availability availability);
    Availability findByIdInProduct(Long id, Product product);
}
