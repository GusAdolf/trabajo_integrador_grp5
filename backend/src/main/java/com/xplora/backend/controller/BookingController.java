package com.xplora.backend.controller;

import com.xplora.backend.dto.request.BookingRequestDto;
import com.xplora.backend.dto.response.BookingResponseDto;
import com.xplora.backend.entity.User;
import com.xplora.backend.service.IBookingService;
import com.xplora.backend.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/bookings")
public class BookingController {
    private IBookingService bookingService;
    private IUserService userService;

    public BookingController(IBookingService bookingService, IUserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<BookingResponseDto> saveBookingOfAuthenticatedUser(@RequestHeader("Authorization") String authHeader,
                                                                             @RequestBody @Valid BookingRequestDto bookingRequestDto) throws MessagingException {
        User user = userService.getAuthenticatedUser(authHeader);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(bookingService.saveBooking(bookingRequestDto, user));
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/user")
    public ResponseEntity<List<BookingResponseDto>> getBookingsByAuthenticatedUser(@RequestHeader("Authorization") String authHeader) {
        User user = userService.getAuthenticatedUser(authHeader);
        return ResponseEntity
                .ok(bookingService.getBookingsByUserId(user.getId()));
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<BookingResponseDto>> getBookingsByProductId(@PathVariable Long productId) {
        return ResponseEntity
                .ok(bookingService.getBookingsByProductId(productId));
    }
}
