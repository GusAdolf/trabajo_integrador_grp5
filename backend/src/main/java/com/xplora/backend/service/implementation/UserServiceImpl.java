package com.xplora.backend.service.implementation;

import com.xplora.backend.configuration.JwtService;
import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.dto.response.UserResponseDto;
import com.xplora.backend.entity.Role;
import com.xplora.backend.entity.User;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.IUserRepository;
import com.xplora.backend.service.IUserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private IUserRepository userRepository;
    private JwtService jwtService;
    @Autowired
    private ModelMapper modelMapper;

    public UserServiceImpl(IUserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        logger.info("getAllUsers - Obteniendo todos los usuarios ...");
        List<User> usersDB = userRepository.findAll();

        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        for (User user : usersDB) {
            userResponseDtoList.add(modelMapper.map(user, UserResponseDto.class));
        }

        return userResponseDtoList;
    }

    @Override
    public UserResponseDto updateUserRole(Long id, UserRoleRequestDto userRoleRequestDto) {
        logger.info("updateUserRole - Actualizando rol: " + userRoleRequestDto + " al usuario con id: " + id);
        Role roleFound = Arrays.stream(Role.values())
                .filter(r -> r.name().equals(userRoleRequestDto.getRole()))
                .findFirst()
                .orElseThrow(() -> new BadRequestException("El rol no existe"));

        if (userRoleRequestDto.getRole().equals("SUPERADMIN")) {
            throw new DataIntegrityViolationException("No puedes cambiar el rol de un usuario a SUPERADMIN");
        }

        User userFound = userRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("El usuario no existe"));

        if (userFound.getRole() == Role.SUPERADMIN) {
            throw new DataIntegrityViolationException("No puedes cambiar el rol de un usuario que es SUPERADMIN");
        }

        userFound.setRole(roleFound);
        User userDB = userRepository.save(userFound);
        return modelMapper.map(userDB, UserResponseDto.class);
    }

    @Override
    public User getAuthenticatedUser(String authHeader) {
        logger.info("getAuthenticatedUser - Obteniendo usuario autenticado por Bearer Token: " + authHeader);
        String token = authHeader.substring(7); // asegurarse q es bearer
        String userEmail = jwtService.extractUsername(token);
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("El email del usuario no existe"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con el email: " + email));
    }
}
