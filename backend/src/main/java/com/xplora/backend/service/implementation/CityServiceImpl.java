package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.City;
import com.xplora.backend.repository.ICityRepository;
import com.xplora.backend.service.ICityService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CityServiceImpl implements ICityService {
    private ICityRepository cityRepository;

    public CityServiceImpl(ICityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public City saveCity(City city) {
        List<City> citiesFound = cityRepository.findByName(city.getName());
        if (citiesFound.stream().anyMatch(c -> Objects.equals(c.getCountry(), city.getCountry()))) {
            throw new DataIntegrityViolationException("La ciudad ya está registrada.");
        }

        return cityRepository.save(city);
    }

    @Override
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
}
