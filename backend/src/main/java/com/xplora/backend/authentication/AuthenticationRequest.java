package com.xplora.backend.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthenticationRequest {
    @NotBlank
    @Size(min = 5, max = 100)
    @Email
    private String email;

    @ToString.Exclude
    @NotBlank
    @Size(min = 8)
    private String password;
}