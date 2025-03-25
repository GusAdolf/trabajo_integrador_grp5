package com.xplora.backend.controller;

import com.xplora.backend.entity.City;
import com.xplora.backend.service.ICityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {
    private ICityService cityService;

    public CityController(ICityService cityService) {
        this.cityService = cityService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<City> saveCity(@RequestBody @Valid City city) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cityService.saveCity(city));
    }

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        return ResponseEntity
                .ok(cityService.getAllCities());
    }
}
