package com.xplora.backend.service;

import com.xplora.backend.dto.request.BookingRequestDto;
import com.xplora.backend.dto.response.BookingResponseDto;
import com.xplora.backend.entity.Booking;
import com.xplora.backend.entity.User;

import java.util.List;

public interface IBookingService {
    BookingResponseDto saveBooking(BookingRequestDto bookingRequestDto, User user);
    List<BookingResponseDto> getBookingsByUserId(Long userId);
    Booking findById(Long id);
}
