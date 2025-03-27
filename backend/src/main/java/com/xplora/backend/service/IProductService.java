package com.xplora.backend.service;

import com.xplora.backend.dto.request.ProductRequestDto;
import com.xplora.backend.dto.response.ProductResponseDto;
import com.xplora.backend.entity.Product;

import java.util.List;

public interface IProductService {
    ProductResponseDto saveProduct(ProductRequestDto productRequestDto);
    ProductResponseDto getProductById(Long id);
    List<ProductResponseDto> getAllProducts();
    ProductResponseDto updateProduct(Long id, ProductRequestDto productRequestDto);
    void deleteProductById(Long id);
    List<Product> getProductsByCategory(Long categoryId);
    void updateAverageScore(Long id, Integer score);
    boolean existsById(Long id);
    Product findById(Long id);
}
