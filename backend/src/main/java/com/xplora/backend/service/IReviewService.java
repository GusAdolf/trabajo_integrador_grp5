package com.xplora.backend.service;

import com.xplora.backend.entity.Review;

import java.util.List;

public interface IReviewService {
    Review saveReviewOfBooking(Review review, Long bookingId, String userToken);
    List<Review> getReviewsByProductId(Long productId);
}
