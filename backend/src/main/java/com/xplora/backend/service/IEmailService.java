package com.xplora.backend.service;

import com.xplora.backend.dto.response.BookingResponseDto;
import com.xplora.backend.entity.User;
import jakarta.mail.MessagingException;

public interface IEmailService {
    void sendMailWelcome(User user) throws MessagingException;
    void sendMailBooking(BookingResponseDto bookingResponseDto) throws MessagingException;
}
