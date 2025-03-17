package com.xplora.backend.controller;

import com.xplora.backend.entity.Product;
import com.xplora.backend.service.IProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<Product> saveProduct(@RequestBody @Valid Product product) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productService.saveProduct(product));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity
                .ok(productService.getProductById(id));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity
                .ok(productService.getAllProducts());
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody @Valid Product product) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productService.updateProduct(product));
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity
                .ok("Se eliminó el producto exitosamente");
    }

    // Obtener productos por categoría
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }
}
