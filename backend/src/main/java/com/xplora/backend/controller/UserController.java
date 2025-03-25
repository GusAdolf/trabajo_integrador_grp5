package com.xplora.backend.controller;

import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.dto.response.UserResponseDto;
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
@RequestMapping("api/v1/users")
public class UserController {
    private IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity
                .ok(userService.getAllUsers());
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id,
                                            @RequestBody @Valid UserRoleRequestDto role) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updateUserRole(id, role));
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/profile")
    public ResponseEntity<User> getAuthenticatedUser(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity
                .ok(userService.getAuthenticatedUser(authHeader));
    }
}
