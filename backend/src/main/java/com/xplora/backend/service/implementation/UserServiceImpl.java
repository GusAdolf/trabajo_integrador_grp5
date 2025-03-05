package com.xplora.backend.service.implementation;

import com.xplora.backend.configuration.JwtService;
import com.xplora.backend.dto.request.UserRoleRequestDto;
import com.xplora.backend.entity.Role;
import com.xplora.backend.entity.User;
import com.xplora.backend.repository.IUserRepository;
import com.xplora.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private IUserRepository iUserRepository;
    private JwtService jwtService;

    @Autowired
    public UserServiceImpl(IUserRepository iUserRepository, JwtService jwtService) {
        this.iUserRepository = iUserRepository;
        this.jwtService = jwtService;
    }

    @Override
    public List<User> findAllUsers() {
        List<User> users = iUserRepository.findAll();
        if (users.isEmpty()) {
            System.out.println("No se encontraron usuarios.");
        } else {
            System.out.println(users.size() + " usuario(s) encontrado(s)."); // TODO: "logger"
        }
        return users;
    }

    @Override
    public User changeRoleUser(Long id, UserRoleRequestDto request) {
        User userFound = iUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se pudo cambiar rol al usuario, el ID: " + id + " no existe."));

        String role = request.getRole();
        if (role == null) {
            throw new RuntimeException("No se pudo cambiar rol al usuario, el rol no debe ser nulo.");
        }

        Role roleFound = Arrays.stream(Role.values())
                .filter(r -> r.name().equals(role))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No se pudo cambiar rol al usuario, rol " + role + " no existe."));

        userFound.setRole(roleFound);
        return iUserRepository.save(userFound);
    }

    @Override
    public User findByTokenUser(String token) {
        String userEmail = jwtService.extractUsername(token);
        return iUserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));
    }
}
