package com.xplora.backend.service.implementation;

import com.xplora.backend.dto.request.ProductRequestDto;
import com.xplora.backend.dto.response.AvailabilityResponseDto;
import com.xplora.backend.dto.response.CityResponseDto;
import com.xplora.backend.dto.response.ProductResponseDto;
import com.xplora.backend.entity.*;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.IProductRepository;
import com.xplora.backend.service.ICityService;
import com.xplora.backend.service.IProductService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductServiceImpl implements IProductService {
    private final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
    private IProductRepository productRepository;
    private ICityService cityService;
    private CategoryService categoryService;
    private FeatureService featureService;
    @Autowired
    private ModelMapper modelMapper;

    public ProductServiceImpl(IProductRepository iProductRepository, ICityService cityService, CategoryService categoryService, FeatureService featureService) {
        this.productRepository = iProductRepository;
        this.cityService = cityService;
        this.categoryService = categoryService;
        this.featureService = featureService;
    }

    @Override
    public ProductResponseDto saveProduct(ProductRequestDto productRequestDto) {
        logger.info("saveProduct - Guardando producto: " + productRequestDto);
        if (productRepository.existsByName(productRequestDto.getName())) {
            throw new DataIntegrityViolationException("El nombre del producto ya esta registrado");
        }

        City city = cityService.findById(productRequestDto.getCity_id());

        Product product = modelMapper.map(productRequestDto, Product.class);
        product.setCity(city);

        for (Image image : product.getImageSet()) {
            image.setProduct(product);
        }

        for (Availability availability : product.getAvailabilitySet()) {
            availability.setProduct(product);
            availability.setRemainingCapacity(product.getCapacity());
        }

        Category category = categoryService.findById(productRequestDto.getCategory_id());
        product.setCategory(category);

        List<Feature> features = featureService.findByIds(productRequestDto.getFeatures_ids());
        product.setFeatures(features);

        Product productDB = productRepository.save(product);
        return productToResponse(productDB);
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        logger.info("getProductById - Obteniendo producto con id: " + id);
        Product productDB = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        return productToResponse(productDB);
    }

    @Override
    public List<ProductResponseDto> getAllProducts() {
        logger.info("getAllProducts - Obteniendo todos los productos ...");
        List<Product> productsDB = productRepository.findAll();

        List<ProductResponseDto> productResponseDtoList = new ArrayList<>();
        for (Product product : productsDB) {
            productResponseDtoList.add(modelMapper.map(product, ProductResponseDto.class));
        }
        return productResponseDtoList;
    }

    @Override
    public ProductResponseDto updateProduct(Long id, ProductRequestDto productRequestDto) {
        logger.info("updateProduct - Actualizando producto con id: " + id + " a " + productRequestDto);
        Product productFound = productRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("El producto no existe"));

        if (!productRequestDto.getName().equals(productFound.getName()) &&
                productRepository.existsByName(productRequestDto.getName())) {
            throw new DataIntegrityViolationException("El nombre del producto ya está registrado");
        }

        City cityFound = cityService.findById(productRequestDto.getCity_id());

        Product product = modelMapper.map(productRequestDto, Product.class);
        product.setCreatedAt(productFound.getCreatedAt());
        product.setId(id);
        product.setAverageScore(productFound.getAverageScore());
        product.setCountScores(productFound.getCountScores());

        product.setCity(cityFound);

        for (Image image : product.getImageSet()) {
            image.setProduct(product);
        }

        for (Availability availability : product.getAvailabilitySet()) {
            availability.setProduct(product);
            availability.setRemainingCapacity(product.getCapacity());
        }

        Category category = categoryService.findById(productRequestDto.getCategory_id());
        product.setCategory(category);

        List<Feature> features = featureService.findByIds(productRequestDto.getFeatures_ids());
        product.setFeatures(features);

        Product productDB = productRepository.save(product);
        return productToResponse(productDB);
    }

    @Override
    public void deleteProductById(Long id) {
        logger.info("deleteProductById - Eliminando producto con id: " + id);
        if (!productRepository.existsById(id)) {
            throw new BadRequestException("El producto no existe");
        }
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public void updateAverageScore(Long id, Integer score) {
        logger.info("updateAverageScore - Actualizando el puntaje promedio del producto con id: " + id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        Double sumScores = product.getAverageScore() * product.getCountScores() + score;
        product.setCountScores(product.getCountScores() + 1);
        product.setAverageScore(sumScores / product.getCountScores());

        productRepository.save(product);
    }

    @Override
    public boolean existsById(Long id) {
        logger.info("existsById - Verificando que el producto con id: " + id + " exista");
        if (!productRepository.existsById(id)) {
            throw new BadRequestException("El producto no existe");
        }
        return true;
    }

    @Override
    public Product findById(Long id) {
        logger.info("findById - Obteniendo producto con id: " + id);
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
    }

    public ProductResponseDto productToResponse(Product product) {
        ProductResponseDto productResponseDto = modelMapper.map(product, ProductResponseDto.class);
        productResponseDto.setCity(modelMapper.map(product.getCity(), CityResponseDto.class));

        Set<AvailabilityResponseDto> availabilities = new HashSet<>();
        for (Availability availability : product.getAvailabilitySet()) {
            availabilities.add(modelMapper.map(availability, AvailabilityResponseDto.class));
        }
        productResponseDto.setAvailabilitySet(availabilities);

        return productResponseDto;
    }
}
