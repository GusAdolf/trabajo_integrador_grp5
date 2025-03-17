package com.xplora.backend.service;

import com.xplora.backend.entity.Booking;

import java.util.List;

public interface IBookingService {
    Booking saveBooking(Booking booking, String userToken);
    Booking getBookingById(Long id);
    List<Booking> getBookingsByUserToken(String userToken);
}
