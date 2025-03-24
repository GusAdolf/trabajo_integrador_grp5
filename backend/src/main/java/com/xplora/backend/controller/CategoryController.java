package com.xplora.backend.controller;

import com.xplora.backend.entity.Category;
import com.xplora.backend.entity.Product;
import com.xplora.backend.service.implementation.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Obtener todas las categorías
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // Obtener productos por categoría con validación
    @GetMapping("/{categoryId}/products")
    public ResponseEntity<?> getProductsByCategory(@PathVariable Long categoryId) {
        if (!categoryService.existsById(categoryId)) {
            return ResponseEntity.badRequest().body("La categoría no existe");
        }

        List<Product> products = categoryService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    // Crear una categoría con validación de título duplicado
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        if (categoryService.existsByTitle(category.getTitle())) {
            return ResponseEntity.badRequest().body("La categoría ya existe");
        }

        return ResponseEntity.ok(categoryService.createCategory(
                category.getTitle(),
                category.getDescription(),
                category.getImageUrl()
        ));
    }

    // Asignar una categoría a un producto con validación
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/{productId}/assign/{categoryId}")
    public ResponseEntity<?> assignCategoryToProduct(@PathVariable Long productId, @PathVariable Long categoryId) {
        if (!categoryService.existsById(categoryId)) {
            return ResponseEntity.badRequest().body("La categoría no existe");
        }

        if (!categoryService.productExistsById(productId)) {
            return ResponseEntity.badRequest().body("El producto no existe");
        }

        return ResponseEntity.ok(categoryService.assignCategoryToProduct(productId, categoryId));
    }

    // ELIMINAR UNA CATEGORÍA (Solo ADMIN y SUPERADMIN)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Categoría eliminada exitosamente");
    }
}
