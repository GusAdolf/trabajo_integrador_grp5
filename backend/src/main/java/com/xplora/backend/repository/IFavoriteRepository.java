package com.xplora.backend.repository;

import com.xplora.backend.entity.Favorite;
import com.xplora.backend.entity.Product;
import com.xplora.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);

    boolean existsByUserAndProduct(User user, Product product);
}

