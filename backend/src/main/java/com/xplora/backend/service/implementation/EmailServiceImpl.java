package com.xplora.backend.service.implementation;

import com.xplora.backend.dto.response.BookingResponseDto;
import com.xplora.backend.entity.Booking;
import com.xplora.backend.entity.User;
import com.xplora.backend.service.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.springframework.core.io.Resource;

import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class EmailServiceImpl implements IEmailService {
    private final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Value("classpath:templates/xplora-logo.png")
    private Resource resourceFile;
    @Value("classpath:templates/xplora-logowhite.png")
    private Resource resourceFile2;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void sendMailWelcome(User user) throws MessagingException {
        logger.info("sendMailWelcome - Enviando correo de registro/bienvenida al usuario con id: " + user.getId());
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(user.getEmail());
        helper.setSubject("Bienvenido/a a Xplora+");

        Context context = new Context();
        context.setVariable("firstname", user.getFirstname());
        String contentHTML = templateEngine.process("email-welcome", context);

        helper.setText(contentHTML, true);
        helper.addInline("attachment.png", resourceFile);

        javaMailSender.send(message);
    }

    @Override
    public void sendMailBooking(BookingResponseDto booking) throws MessagingException {
        logger.info("sendMailBooking - Enviando correo de confirmación de reserva: " + booking);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(booking.getUser().getEmail());
        helper.setSubject("Xplora+ ¡Reserva confirmada!");

        Context context = new Context();

        context.setVariable("user_firstname", booking.getUser().getFirstname());
        context.setVariable("user_lastname", booking.getUser().getLastname());

        context.setVariable("booking_created_date", booking.getCreatedAt().toLocalDate());
        context.setVariable("booking_created_time", booking.getCreatedAt().toLocalTime().truncatedTo(ChronoUnit.MINUTES));
        context.setVariable("product_name", booking.getProduct().getName());
        context.setVariable("product_image", booking.getProduct().getImageSet().stream().toList().get(0).getImageUrl());
        context.setVariable("product_address", booking.getProduct().getAddress());
        context.setVariable("product_city", booking.getProduct().getCity().getName());
        context.setVariable("product_country", booking.getProduct().getCity().getCountry());
        context.setVariable("product_quantity", booking.getQuantity());
        context.setVariable("product_total", booking.getProduct().getPrice() * booking.getQuantity());

        context.setVariable("availability_date", booking.getAvailability().getDate());

        String contentHTML = templateEngine.process("email-booking", context);

        helper.setText(contentHTML, true);
        helper.addInline("attachment2.png", resourceFile2);

        javaMailSender.send(message);
    }
}
