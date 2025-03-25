package com.xplora.backend.repository;

import com.xplora.backend.entity.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAvailabilityRepository extends JpaRepository<Availability, Long> {
    //List<Availability> findByProductId(Long productId);
}
