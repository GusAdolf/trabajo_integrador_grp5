package com.xplora.backend.controller;

import com.xplora.backend.dto.request.BookingEmailRequest;
import com.xplora.backend.dto.response.BookingResponseDto;
import com.xplora.backend.entity.User;
import com.xplora.backend.service.IBookingService;
import com.xplora.backend.service.IEmailService;
import com.xplora.backend.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("api/v1/send-email")
public class EmailController {
    private final IEmailService emailService;
    private final IUserService userService;
    private final IBookingService bookingService;

    public EmailController(IEmailService emailService, IUserService userService, IBookingService bookingService) {
        this.emailService = emailService;
        this.userService = userService;
        this.bookingService = bookingService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/welcome")
    private ResponseEntity<String> sendEmailWelcomeToAuthenticatedUser(@RequestHeader("Authorization") String authHeader) throws MessagingException {
        User user = userService.getAuthenticatedUser(authHeader);
        emailService.sendMailWelcome(user);
        return ResponseEntity
                .ok("Correo enviado exitosamente");
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/booking")
    public ResponseEntity<String> sendBookingEmail(@RequestBody BookingEmailRequest request, @RequestHeader("Authorization") String authHeader) {
        try {



            BookingResponseDto bookingResponseDto = bookingService.getBookingResponseById(request.getBookingId());
            emailService.sendMailBooking(bookingResponseDto);
            return ResponseEntity.ok("Correo enviado exitosamente");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al enviar el correo: " + e.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + ex.getMessage());
        }
    }
}
