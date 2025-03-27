package com.xplora.backend.service.implementation;

import com.xplora.backend.dto.response.AvailabilityResponseDto;
import com.xplora.backend.entity.Availability;
import com.xplora.backend.entity.Product;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.IAvailabilityRepository;
import com.xplora.backend.service.IAvailabilityService;
import com.xplora.backend.service.IProductService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AvailabilityServiceImpl implements IAvailabilityService {
    private final Logger logger = LoggerFactory.getLogger(AvailabilityServiceImpl.class);
    private IAvailabilityRepository availabilityRepository;
    private IProductService productService;
    @Autowired
    private ModelMapper modelMapper;

    public AvailabilityServiceImpl(IAvailabilityRepository availabilityRepository, IProductService productService) {
        this.availabilityRepository = availabilityRepository;
        this.productService = productService;
    }

    @Override
    public List<AvailabilityResponseDto> getAvailabilitiesByProductId(Long productId) {
        logger.info("getAvailabilitiesByProductId - Obteniendo disponibilidades de producto con id: " + productId);
        if (!productService.existsById(productId)) {
            return null;
        }
        List<Availability> availabilitiesDB = availabilityRepository.findByProductId(productId);

        List<AvailabilityResponseDto> availabilityResponseDtoList = new ArrayList<>();
        for (Availability availability : availabilitiesDB) {
            availabilityResponseDtoList.add(modelMapper.map(availability, AvailabilityResponseDto.class));
        }

        return availabilityResponseDtoList;
    }

    @Override
    public Availability updateAvailability(Availability availability) {
        logger.info("updateAvailability - Actualizando disponibilidad: " + availability);
        Availability availabilityFound = availabilityRepository.findById(availability.getId())
                .orElseThrow(() -> new ResourceNotFoundException("La disponibilidad no existe"));

        availabilityFound.setDate(availability.getDate());
        availabilityFound.setRemainingCapacity(availability.getRemainingCapacity());
        return availabilityRepository.save(availabilityFound);
    }

    @Override
    public Availability findByIdInProduct(Long id, Product product) {
        logger.info("findByIdInProduct - Buscando disponibilidad con id: " + id + " en el producto: " + product);
        return product.getAvailabilitySet().stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("La disponibilidad no existe en el producto"));
    }
}
