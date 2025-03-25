package com.xplora.backend.controller;

import com.xplora.backend.dto.request.ReviewRequestDto;
import com.xplora.backend.dto.response.ReviewResponseDto;
import com.xplora.backend.entity.User;
import com.xplora.backend.service.IReviewService;
import com.xplora.backend.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/reviews")
public class ReviewController {
    private IReviewService reviewService;
    private IUserService userService;

    public ReviewController(IReviewService reviewService, IUserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/booking/{bookingId}")
    public ResponseEntity<ReviewResponseDto> saveReview(@PathVariable Long bookingId,
                                                        @RequestHeader("Authorization") String authHeader,
                                                        @RequestBody @Valid ReviewRequestDto reviewRequestDto) {
        User user = userService.getAuthenticatedUser(authHeader);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reviewService.saveReview(bookingId, reviewRequestDto, user));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponseDto>> getReviewsByProductId(@PathVariable Long productId) {
        return ResponseEntity
                .ok(reviewService.getReviewsByProductId(productId));
    }
}
