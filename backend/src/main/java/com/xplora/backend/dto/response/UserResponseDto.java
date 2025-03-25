package com.xplora.backend.dto.response;

import com.xplora.backend.entity.Role;
import com.xplora.backend.entity.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto extends Timestamp {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
}
