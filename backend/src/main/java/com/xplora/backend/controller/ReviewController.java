package com.xplora.backend.controller;

import com.xplora.backend.entity.Review;
import com.xplora.backend.service.IReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private IReviewService reviewService;


    public ReviewController(IReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/booking/{bookingId}")
    public ResponseEntity<Review> saveReviewOfBooking(@RequestHeader("Authorization") String authHeader,
                                                      @RequestBody @Valid Review review,
                                                      @PathVariable Long bookingId) {
        String userToken = authHeader.substring(7);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reviewService.saveReviewOfBooking(review, bookingId, userToken));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable Long productId) {
        return ResponseEntity
                .ok(reviewService.getReviewsByProductId(productId));
    }
}
