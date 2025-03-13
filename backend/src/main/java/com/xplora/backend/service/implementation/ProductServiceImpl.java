package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.City;
import com.xplora.backend.entity.Image;
import com.xplora.backend.entity.Product;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.ICityRepository;
import com.xplora.backend.repository.IProductRepository;
import com.xplora.backend.service.IProductService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {
    private IProductRepository productRepository;
    private ICityRepository cityRepository;

    public ProductServiceImpl(IProductRepository iProductRepository, ICityRepository cityRepository) {
        this.productRepository = iProductRepository;
        this.cityRepository = cityRepository;
    }

    @Override
    public Product saveProduct(Product product) {
        Optional<Product> productFound = productRepository.findByName(product.getName());
        if (productFound.isPresent()) {
            throw new DataIntegrityViolationException("El nombre del producto ya está registrado.");
        }

        City city = cityRepository.findById(product.getCity().getId())
                .orElseThrow(() -> new BadRequestException("La ciudad del producto no existe."));

        if (product.getImageSet() == null || product.getImageSet().size() < 5) {
            throw new BadRequestException("El producto debe tener almenos 5 imagenes.");
        }

        product.setCity(city);
        for (Image image : product.getImageSet()) {
            image.setProduct(product);
        }
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(product.getCreatedAt());

        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado."));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product updateProduct(Product product) {
        Product productFound = productRepository.findById(product.getId())
                .orElseThrow(() -> new BadRequestException("El producto no existe."));

        City city = cityRepository.findById(product.getCity().getId())
                .orElseThrow(() -> new BadRequestException("La ciudad del producto no existe."));

        if (product.getImageSet() == null || product.getImageSet().size() < 5) {
            throw new BadRequestException("El producto debe tener almenos 5 imagenes.");
        }

        product.setCity(city);
        for (Image image : product.getImageSet()) {
            image.setProduct(product);
        }
        product.setCreatedAt(productFound.getCreatedAt());
        product.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    @Override
    public void deleteProductById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new BadRequestException("El producto no existe.");
        }

        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
}
