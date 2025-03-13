package com.xplora.backend.controller;

import com.xplora.backend.entity.City;
import com.xplora.backend.entity.Product;
import com.xplora.backend.service.ICityService;
import com.xplora.backend.service.IProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public ResponseEntity<City> saveCity(@RequestBody City city) {
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
