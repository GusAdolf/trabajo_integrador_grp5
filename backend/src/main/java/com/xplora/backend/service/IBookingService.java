package com.xplora.backend.service;

import com.xplora.backend.dto.request.BookingRequestDto;
import com.xplora.backend.dto.response.BookingResponseDto;
import com.xplora.backend.entity.Booking;
import com.xplora.backend.entity.User;
import jakarta.mail.MessagingException;

import java.util.List;

public interface IBookingService {
    BookingResponseDto saveBooking(BookingRequestDto bookingRequestDto, User user) throws MessagingException;
    List<BookingResponseDto> getBookingsByUserId(Long userId);
    List<BookingResponseDto> getBookingsByProductId(Long productId);
    Booking findById(Long id);
}
