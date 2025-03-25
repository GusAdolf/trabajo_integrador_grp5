package com.xplora.backend.controller;

import com.xplora.backend.entity.User;
import com.xplora.backend.service.IEmailService;
import com.xplora.backend.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/send-email")
public class EmailController {
    private IEmailService emailService;
    private IUserService userService;

    public EmailController(IEmailService emailService, IUserService userService) {
        this.emailService = emailService;
        this.userService = userService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/welcome")
    private ResponseEntity<String> sendEmailWelcome(@RequestHeader("Authorization") String authHeader) {
        try {
            String userToken = authHeader.substring(7);
            User user = userService.getUserByToken(userToken);
            emailService.sendMailWelcome(user);
            return ResponseEntity
                    .ok("Correo enviado exitosamente");
        } catch (Exception ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }
}
