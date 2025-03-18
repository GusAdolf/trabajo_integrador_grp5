package com.xplora.backend.repository;

import com.xplora.backend.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICityRepository extends JpaRepository<City, Integer> {
    List<City> findByName(String nameCity);
}
