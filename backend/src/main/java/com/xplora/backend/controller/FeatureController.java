package com.xplora.backend.controller;

import com.xplora.backend.entity.Feature;
import com.xplora.backend.service.implementation.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/features")
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    // Obtener todas las características (HU 17) - Solo para administradores
    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Feature>> getAllFeatures() {
        return ResponseEntity.ok(featureService.getAllFeatures());
    }

    // Obtener características de un producto
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Feature>> getFeaturesByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(featureService.getFeaturesByProduct(productId));
    }

    // Agregar una característica a un producto
    @PostMapping("/product/{productId}")
    public ResponseEntity<?> addFeatureToProduct(@PathVariable Long productId, @RequestParam Long featureId) {
        Optional<Feature> featureOptional = featureService.findById(featureId);
        if (featureOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Feature does not exist");
        }
        return ResponseEntity.ok(featureService.addFeatureToProduct(productId, featureOptional.get()));
    }

    // Crear una nueva característica - Solo para administradores
    //@PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createFeature(@RequestBody Feature feature) {
        if (featureService.existsByName(feature.getName())) {
            return ResponseEntity.badRequest().body("Feature name already exists");
        }
        return ResponseEntity.ok(featureService.createFeature(feature.getName(), feature.getIconUrl()));
    }

    // Editar una característica - Solo para administradores
    //@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{featureId}")
    public ResponseEntity<?> updateFeature(@PathVariable Long featureId, @RequestBody Feature featureDetails) {
        if (featureService.existsByName(featureDetails.getName()) && !featureService.findById(featureId).get().getName().equals(featureDetails.getName())) {
            return ResponseEntity.badRequest().body("Feature name already exists");
        }
        return ResponseEntity.ok(featureService.updateFeature(featureId, featureDetails));
    }

    // Eliminar una característica - Solo para administradores
    //@PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{featureId}")
    public ResponseEntity<Void> deleteFeature(@PathVariable Long featureId) {
        featureService.deleteFeature(featureId);
        return ResponseEntity.noContent().build();
    }
}
