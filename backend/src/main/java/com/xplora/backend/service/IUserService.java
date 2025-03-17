package com.xplora.backend.service;

import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.entity.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User changeUserRole(Long id, UserRoleRequestDto request);
    User getUserByToken(String token);
}
