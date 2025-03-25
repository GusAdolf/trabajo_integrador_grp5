package com.xplora.backend.service;

import com.xplora.backend.entity.City;

import java.util.List;

public interface ICityService {
    City saveCity(City city);
    List<City> getAllCities();
}
