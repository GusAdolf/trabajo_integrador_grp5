package com.xplora.backend.controller;

import com.xplora.backend.dto.response.AvailabilityResponseDto;
import com.xplora.backend.service.IAvailabilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/availabilities")
public class AvailabilityController {
    private IAvailabilityService availabilityService;

    public AvailabilityController(IAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<AvailabilityResponseDto>> getAvailabilitiesByProductId(@PathVariable Long productId) {
        return ResponseEntity
                .ok(availabilityService.getAvailabilitiesByProductId(productId));
    }
}
