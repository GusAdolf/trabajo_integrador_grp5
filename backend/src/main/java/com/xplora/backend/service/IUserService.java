package com.xplora.backend.service;

import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.dto.response.UserResponseDto;
import com.xplora.backend.entity.User;

import java.util.List;

public interface IUserService {
    List<UserResponseDto> getAllUsers();
    UserResponseDto updateUserRole(Long id, UserRoleRequestDto userRoleRequestDto);
    User getAuthenticatedUser(String authHeader);
    User getUserByEmail(String email);
}
