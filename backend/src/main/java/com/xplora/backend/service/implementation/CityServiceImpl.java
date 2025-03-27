package com.xplora.backend.service.implementation;

import com.xplora.backend.dto.request.CityRequestDto;
import com.xplora.backend.dto.response.CityResponseDto;
import com.xplora.backend.entity.City;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.repository.ICityRepository;
import com.xplora.backend.service.ICityService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CityServiceImpl implements ICityService {
    private final Logger logger = LoggerFactory.getLogger(CityServiceImpl.class);
    private ICityRepository cityRepository;
    @Autowired
    private ModelMapper modelMapper;

    public CityServiceImpl(ICityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public CityResponseDto saveCity(CityRequestDto cityRequestDto) {
        logger.info("saveCity - Guardando ciudad: " + cityRequestDto);

        List<City> citiesFound = cityRepository.findByName(cityRequestDto.getName());
        if (citiesFound.stream().anyMatch(c -> Objects.equals(c.getCountry(), cityRequestDto.getCountry()))) {
            throw new DataIntegrityViolationException("La ciudad ya esta registrada");
        }

        City city = modelMapper.map(cityRequestDto, City.class);
        City cityDB = cityRepository.save(city);
        return modelMapper.map(cityDB, CityResponseDto.class);
    }

    @Override
    public List<CityResponseDto> getAllCities() {
        logger.info("getAllCities - Obteniendo todas las ciudades ...");
        List<City> citiesDB = cityRepository.findAll();

        List<CityResponseDto> citiyCityResponseDtoList = new ArrayList<>();
        for (City city : citiesDB) {
            citiyCityResponseDtoList.add(modelMapper.map(city, CityResponseDto.class));
        }
        return citiyCityResponseDtoList;
    }

    @Override
    public City findById(Integer id) {
        logger.info("findById - Obteniendo la ciudad con id: " + id);
        return cityRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("La ciudad no existe"));
    }
}
