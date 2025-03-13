package com.xplora.backend.service;

import com.xplora.backend.entity.Product;

import java.util.List;

public interface IProductService {
    Product saveProduct(Product product);
    Product getProductById(Long id);
    List<Product> getAllProducts();
    Product updateProduct(Product product);
    void deleteProductById(Long id);
    List<Product> getProductsByCategory(Long categoryId);
}
