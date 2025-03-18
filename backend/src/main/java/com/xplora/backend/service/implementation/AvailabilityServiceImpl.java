package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Availability;
import com.xplora.backend.entity.Product;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.IAvailabilityRepository;
import com.xplora.backend.service.IAvailabilityService;
import com.xplora.backend.service.IProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailabilityServiceImpl implements IAvailabilityService {
    private IAvailabilityRepository availabilityRepository;
    private IProductService productService;

    public AvailabilityServiceImpl(IAvailabilityRepository availabilityRepository, IProductService productService) {
        this.availabilityRepository = availabilityRepository;
        this.productService = productService;
    }

    @Override
    public Availability saveAvailabilityOfProduct(Availability availability, Long productId) {
        if (productId == null) {
            throw new BadRequestException("La disponibilidad no tiene un producto donde pertenezca");
        }
        Product product = productService.getProductById(productId);

        availability.setProduct(product); // es necesario?
        availability.setCapacity(product.getMaxCapacity());

        return availabilityRepository.save(availability);
    }

    @Override
    public Availability updateAvailability(Availability availability) {
        Availability availabilityFound = availabilityRepository.findById(availability.getId())
                .orElseThrow(() -> new ResourceNotFoundException("La disponibilidad del producto no existe"));

        availability.setProduct(availabilityFound.getProduct());
        return availabilityRepository.save(availability);
    }

    /*@Override
    public List<Availability> getAvailabitiesByProductId(Long productId) {
        if (!productService.existsById(productId)) {
            throw new BadRequestException("El producto no existe");
        }
        return availabilityRepository.findByProductId(productId);
    }*/
}
