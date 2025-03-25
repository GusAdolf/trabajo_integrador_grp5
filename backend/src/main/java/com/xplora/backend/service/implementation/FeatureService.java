package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Feature;
import com.xplora.backend.entity.Product;
import com.xplora.backend.repository.IFeatureRepository;
import com.xplora.backend.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    @Autowired
    private IFeatureRepository featureRepository;

    @Autowired
    private IProductRepository productRepository;

    // Obtener todas las características
    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    // Obtener características de un producto (ManyToMany)
    public List<Feature> getFeaturesByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return product.getFeatures();
    }

    // Agregar una característica existente a un producto
    public Feature addFeatureToProduct(Long productId, Feature feature) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!featureRepository.existsById(feature.getId())) {
            throw new RuntimeException("Feature no encontrada");
        }

        product.getFeatures().add(feature);
        productRepository.save(product);

        return feature;
    }

    // Crear una nueva característica con validación de nombre
    public Feature createFeature(String name, String iconUrl) {
        if (featureRepository.existsByName(name)) {
            throw new RuntimeException("El nombre de la característica ya existe");
        }

        Feature feature = new Feature();
        feature.setName(name);
        feature.setIconUrl(iconUrl);

        return featureRepository.save(feature);
    }

    // Actualizar una característica con validación de nombre
    public Feature updateFeature(Long featureId, Feature featureDetails) {
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(() -> new RuntimeException("Característica no encontrada"));

        // Verificar si el nuevo nombre ya existe en otra característica
        if (featureRepository.existsByName(featureDetails.getName()) &&
                !feature.getName().equals(featureDetails.getName())) {
            throw new RuntimeException("El nombre de la característica ya existe");
        }

        feature.setName(featureDetails.getName());
        feature.setIconUrl(featureDetails.getIconUrl());

        return featureRepository.save(feature);
    }

    // Eliminar una característica con verificación de existencia
    public void deleteFeature(Long featureId) {
        if (!featureRepository.existsById(featureId)) {
            throw new RuntimeException("Característica no encontrada");
        }
        featureRepository.deleteById(featureId);
    }

    // verificar si una caracteristica con el mismo nombre existe
    public boolean existsByName(String name) {
        return featureRepository.existsByName(name);
    }

    // vertificar si una caracteristica con id existe
    public boolean existsById(Long id) {
        return featureRepository.existsById(id);
    }

    // Obtener una Feature por ID
    public Optional<Feature> findById(Long featureId) {
        return featureRepository.findById(featureId);
    }
}
