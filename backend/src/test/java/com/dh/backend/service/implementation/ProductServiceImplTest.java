package com.dh.backend.service.implementation;

import com.dh.backend.model.Image;
import com.dh.backend.model.Product;
import com.dh.backend.service.IProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class ProductServiceImplTest {
    private IProductService productService;
    private Set<Image> imageSet = new HashSet<>();

    @Autowired
    public ProductServiceImplTest(IProductService productService) {
        this.productService = productService;
    }

    @BeforeEach
    void setUp() {
        //productService.deleteAll();
        imageSet.clear();
        imageSet.add(new Image(null, "url1", null));
        imageSet.add(new Image(null, "url2", null));
        imageSet.add(new Image(null, "url3", null));
        imageSet.add(new Image(null, "url4", null));
        imageSet.add(new Image(null, "url5", null));
    }

    @Test
    @DisplayName("Testear que un producto se guarde en la bd con almenos 5 imagenes.")
    void testSave() throws Exception {
        // arrange
        Product product = new Product(null, "nombre", "descripcion", 11.11d, null, imageSet);

        // act
        Product savedProduct = productService.saveProduct(product);

        // assert
        assertNotNull(savedProduct);
        assertNotNull(savedProduct.getId());
        assertEquals("nombre", savedProduct.getName());
        assertEquals(11.11d, savedProduct.getPrice());
        assertNotNull(savedProduct.getCreatedAt());
        assert(savedProduct.getImageSet().size() >= 5);
        // TODO: verificar que cada imagen se guarde correctamente?
    }

    @Test
    @DisplayName("Testear que un producto no se guarde si existe su nombre en la bd.")
    void testSaveExceptionIfProductNameExists() throws Exception {
        Product product1 = new Product(null, "nombre1", "descripcion1", 11.11d, null, imageSet);
        Product product2 = new Product(null, "nombre1", "descripcion2", 22.22d, null, imageSet);

        Product savedProduct1 = productService.saveProduct(product1);
        Exception ex = assertThrows(
                Exception.class,
                () -> productService.saveProduct(product2)
        );

        assertEquals("El producto con nombre '" + savedProduct1.getName() + "' ya existe.", ex.getMessage());
    }

    @Test
    @DisplayName("Testear que un producto no se guarde en la bd si tiene menos de 5 imagenes.")
    void testSaveExceptionIfFewProductImages() {
        imageSet.clear();
        Product product = new Product(null, "nombre2", "descripcion", 11.11d, null, imageSet);

        Exception ex = assertThrows(
                Exception.class,
                () -> productService.saveProduct(product)
        );

        assertEquals("El producto debe tener almenos 5 imagenes.", ex.getMessage());
    }

    @Test
    @DisplayName("Testear obtener un producto al buscar por id existente en la bd.")
    void testFindById() throws Exception {
        Product product = new Product(null, "nombre3", "descripcion", 11.11d, null, imageSet);
        Long id = productService.saveProduct(product).getId();

        Product foundProduct = productService.findByIdProduct(id);

        assertNotNull(foundProduct);
        assertEquals("nombre3", foundProduct.getName());
    }

    @Test
    @DisplayName("Testear no obtener un producto al buscar id no existente en la bd.")
    void testFindExceptionIfProductNotFound() throws IllegalStateException {
        IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                () -> productService.findByIdProduct(1000L)
        );

        assertEquals("Producto con ID: 1000 no encontrado.", ex.getMessage());
    }

    @Test
    @DisplayName("Testear obtener todos los productos de la bd (hay almenos 1 producto).")
    void testFindAll() throws Exception {
        Product product = new Product(null, "nombre4", "descripcion", 11.11d, null, imageSet);
        productService.saveProduct(product);

        List<Product> products = productService.findAllProducts();

        assertNotNull(products);
        assertFalse(products.isEmpty());
        // TODO: verificar que cada elemento de la lista sea un producto?
    }

    // TODO: Test cuando no hay productos?

    @Test
    @DisplayName("Testear eliminar un producto en la bd.")
    void testDeleteById() throws Exception {
        Product product = new Product(null, "nombre5", "descripcion", 11.11d, null, imageSet);
        Long id = productService.saveProduct(product).getId();

        productService.deleteByIdProduct(id);
        IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                () -> productService.findByIdProduct(id)
        );

        assertEquals("Producto con ID: " + id + " no encontrado.", ex.getMessage());
    }

    @Test
    @DisplayName("Testear no poder eliminar un producto si su id no existe en la bd.")
    void testDeleteExceptionIfProductNotExists() {
        IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                () -> productService.deleteByIdProduct(2000L)
        );

        assertEquals("No se pudo eliminar el producto, el ID: 2000 no existe.", ex.getMessage());
    }
}