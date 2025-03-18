package com.xplora.backend.repository;

import com.xplora.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String productName);
    List<Product> findByCategoryId(Long categoryId);
}
