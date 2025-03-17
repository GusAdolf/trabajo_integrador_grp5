package com.xplora.backend.service.implementation;

import com.xplora.backend.configuration.JwtService;
import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.entity.Role;
import com.xplora.backend.entity.User;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.IUserRepository;
import com.xplora.backend.service.IUserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private IUserRepository userRepository;
    private JwtService jwtService;

    public UserServiceImpl(IUserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User changeUserRole(Long id, UserRoleRequestDto request) {
        if (request.getRole().equals("SUPERADMIN")) {
            throw new DataIntegrityViolationException("No puedes cambiar el rol de un usuario a SUPERADMIN");
        }

        Role roleFound = Arrays.stream(Role.values())
                .filter(r -> r.name().equals(request.getRole()))
                .findFirst()
                .orElseThrow(() -> new BadRequestException("El rol no existe"));

        if (id == null) {
            throw new BadRequestException("El id del usuario no debe ser nulo");
        }
        User userFound = userRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("El usuario no existe"));

        if (userFound.getRole() == Role.SUPERADMIN) {
            throw new DataIntegrityViolationException("No puedes cambiar el rol de un usuario que es SUPERADMIN");
        }

        userFound.setRole(roleFound);
        return userRepository.save(userFound);
    }

    @Override
    public User getUserByToken(String token) {
        String userEmail = jwtService.extractUsername(token);
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
    }
}
