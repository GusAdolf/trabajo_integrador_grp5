package com.xplora.backend.controller;

import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.entity.User;
import com.xplora.backend.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity
                .ok(userService.getAllUsers());
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("{id}/role")
    public ResponseEntity<?> changeUserRole(@PathVariable Long id,
                                            @RequestBody @Valid UserRoleRequestDto role) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.changeUserRole(id, role));
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/profile")
    public ResponseEntity<User> getUserByToken(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        return ResponseEntity
                .ok(userService.getUserByToken(token));
    }
}
