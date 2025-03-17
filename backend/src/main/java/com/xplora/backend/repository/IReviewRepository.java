package com.xplora.backend.repository;

import com.xplora.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);
}
