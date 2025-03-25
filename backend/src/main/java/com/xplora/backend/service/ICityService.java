package com.xplora.backend.service;

import com.xplora.backend.dto.request.CityRequestDto;
import com.xplora.backend.dto.response.CityResponseDto;
import com.xplora.backend.entity.City;

import java.util.List;

public interface ICityService {
    CityResponseDto saveCity(CityRequestDto cityRequestDto);
    List<CityResponseDto> getAllCities();
    City findById(Integer id);
}
