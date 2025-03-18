package com.xplora.backend.controller;

import com.xplora.backend.entity.Booking;
import com.xplora.backend.service.IBookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    private IBookingService bookingService;

    public BookingController(IBookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<Booking> saveBooking(@RequestHeader("Authorization") String authHeader,
                                                  @RequestBody @Valid Booking booking) {
        String userToken = authHeader.substring(7);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(bookingService.saveBooking(booking, userToken));
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/user")
    public ResponseEntity<List<Booking>> getBookingsByUserToken(@RequestHeader("Authorization") String authHeader) {
        String userToken = authHeader.substring(7);
        return ResponseEntity
                .ok(bookingService.getBookingsByUserToken(userToken));
    }
}
