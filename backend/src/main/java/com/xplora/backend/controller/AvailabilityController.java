package com.xplora.backend.controller;

import com.xplora.backend.entity.Availability;
import com.xplora.backend.service.IAvailabilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/availabilities")
public class AvailabilityController {
    private IAvailabilityService availabilityService;

    public AvailabilityController(IAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/product/{productId}")
    public  ResponseEntity<Availability> saveAvailabilityOfProduct(@RequestBody @Valid Availability availability,
                                                                   @PathVariable Long productId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(availabilityService.saveAvailabilityOfProduct(availability, productId));
    }

    /*@Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping
    public  ResponseEntity<Availability> updateAvailability(@RequestBody @Valid Availability availability) {
        return ResponseEntity
                .ok(availabilityService.updateAvailability(availability));
    }*/

    /*@GetMapping("/products/{productId}")
    public ResponseEntity<List<Availability>> getAvailabilitiesByProductId(@PathVariable Long productId) {
        return ResponseEntity
                .ok(availabilityService.getAvailabitiesByProductId(productId));
    }*/
}
