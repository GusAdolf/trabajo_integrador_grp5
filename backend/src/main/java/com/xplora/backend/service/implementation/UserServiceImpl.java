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
        String newRole = request.getRole();
        if (newRole == null) {
            throw new RuntimeException("No se pudo cambiar rol al usuario, el rol no debe ser nulo.");
        }

        if (newRole.equals("SUPERADMIN")) {
            throw new RuntimeException("No puedes cambiar el rol de un usuario a SUPERADMIN.");
        }

        Role roleFound = Arrays.stream(Role.values())
                .filter(r -> r.name().equals(newRole))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No se pudo cambiar rol al usuario, rol " + newRole + " no existe."));

        User userFound = iUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se pudo cambiar rol al usuario, el ID: " + id + " no existe."));

        if (userFound.getRole() == Role.SUPERADMIN) {
            throw new RuntimeException("No puedes cambiar el rol al SUPERADMIN");
        }

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
