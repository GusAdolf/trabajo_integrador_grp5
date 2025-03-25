package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Category;
import com.xplora.backend.entity.Product;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.ICategoryRepository;
import com.xplora.backend.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private IProductRepository productRepository;

    // Obtener todas las categorías
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Obtener productos de una categoría con validación
    public List<Product> getProductsByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        return category.getProducts();
    }

    // Crear una nueva categoría con validación de nombre duplicado
    public Category createCategory(String title, String description, String imageUrl) {
        if (categoryRepository.findByTitle(title).isPresent()) {
            throw new RuntimeException("La categoría ya existe");
        }

        Category category = new Category();
        category.setTitle(title);
        category.setDescription(description);
        category.setImageUrl(imageUrl);
        return categoryRepository.save(category);
    }

    // Asignar una categoría a un producto con validaciones
    public Product assignCategoryToProduct(Long productId, Long categoryId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        product.setCategory(category);
        return productRepository.save(product);
    }

    // Verificar si una categoría existe
    public boolean existsById(Long categoryId) {
        return categoryRepository.existsById(categoryId);
    }

    // Verificar si un producto existe
    public boolean productExistsById(Long productId) {
        return productRepository.existsById(productId);
    }

    // Verificar que una categoría con el mismo nombre existe
    public boolean existsByTitle(String title) {
        return categoryRepository.findByTitle(title).isPresent();
    }

    //  ELIMINAR UNA CATEGORÍA CON VALIDACIONES
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        if (!category.getProducts().isEmpty()) {
            throw new RuntimeException("No se puede eliminar una categoría que tiene productos asignados");
        }

        categoryRepository.delete(category);
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La categoria no existe"));
    }
}
