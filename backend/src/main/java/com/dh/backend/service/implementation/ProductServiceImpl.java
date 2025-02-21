package com.dh.backend.service.implementation;

import com.dh.backend.model.Image;
import com.dh.backend.model.Product;
import com.dh.backend.repository.IProductRepository;
import com.dh.backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {
    private IProductRepository iProductRepository;

    @Autowired
    public ProductServiceImpl(IProductRepository iProductRepository) {
        this.iProductRepository = iProductRepository;
    }

    @Override
    public Product saveProduct(Product product) throws Exception {
        Optional<Product> OptionalProduct = iProductRepository.findByName(product.getName());
        if (OptionalProduct.isPresent()) {
            throw new Exception("El producto con nombre '" + product.getName() + "' ya existe.");
        }
        if (product.getImageSet() == null || product.getImageSet().size() < 5) {
            throw new Exception("El producto debe tener almenos 5 imagenes.");
        }
        for (Image image : product.getImageSet()) {
            image.setProduct(product);
        }
        product.setCreatedAt(LocalDateTime.now());
        return iProductRepository.save(product);
    }

    @Override
    public Product findByIdProduct(Long id) throws IllegalStateException {
        return iProductRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Producto con ID: " + id + " no encontrado."));
    }

    @Override
    public List<Product> findAllProducts() {
        List<Product> products = iProductRepository.findAll();
        if (products.isEmpty()) {
            System.out.println("No se encontraron productos.");
        } else {
            System.out.println(products.size() + " producto(s) encontrado(s)."); // TODO: "logger"
        }
        return products;
    }

    @Override
    public void deleteByIdProduct(Long id) throws IllegalStateException {
        if (!iProductRepository.existsById(id)) {
            throw new IllegalStateException("No se pudo eliminar el producto, el ID: " + id + " no existe.");
        }
        // TODO: Si producto tiene usuarios, no se debe poder eliminar
        iProductRepository.deleteById(id);
    }
}
