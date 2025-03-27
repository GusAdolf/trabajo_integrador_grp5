package com.xplora.backend.service;

import com.xplora.backend.dto.request.ReviewRequestDto;
import com.xplora.backend.dto.response.ReviewResponseDto;
import com.xplora.backend.entity.User;

import java.util.List;

public interface IReviewService {
    ReviewResponseDto saveReview(Long bookingId, ReviewRequestDto reviewRequestDto, User user);
    List<ReviewResponseDto> getReviewsByProductId(Long productId);
}
