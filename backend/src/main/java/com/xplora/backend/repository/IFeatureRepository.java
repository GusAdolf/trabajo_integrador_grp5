package com.xplora.backend.repository;

import com.xplora.backend.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Long> {
    boolean existsByName(String name);  // Verifica si una característica con el mismo nombre ya existe
}
