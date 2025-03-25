package com.xplora.backend.controller;

import com.xplora.backend.dto.request.CityRequestDto;
import com.xplora.backend.dto.response.CityResponseDto;
import com.xplora.backend.service.ICityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cities")
public class CityController {
    private ICityService cityService;

    public CityController(ICityService cityService) {
        this.cityService = cityService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<CityResponseDto> saveCity(@RequestBody @Valid CityRequestDto cityRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cityService.saveCity(cityRequestDto));
    }

    @GetMapping
    public ResponseEntity<List<CityResponseDto>> getAllCities() {
        return ResponseEntity
                .ok(cityService.getAllCities());
    }
}
