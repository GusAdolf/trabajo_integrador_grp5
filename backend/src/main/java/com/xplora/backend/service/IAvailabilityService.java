package com.xplora.backend.service;

import com.xplora.backend.entity.Availability;

import java.util.List;

public interface IAvailabilityService {
    Availability saveAvailabilityOfProduct(Availability availability, Long productId);
    Availability updateAvailability(Availability availability);
    //List<Availability> getAvailabitiesByProductId(Long productId);
}
