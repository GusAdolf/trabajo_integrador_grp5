package com.xplora.backend.controller;

import com.xplora.backend.entity.Favorite;
import com.xplora.backend.entity.User;
import com.xplora.backend.service.implementation.FavoriteServiceImpl;
import com.xplora.backend.service.IUserService;
import com.xplora.backend.configuration.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteServiceImpl favoriteService;

    @Autowired
    private IUserService userService;

    @Autowired
    private JwtService jwtService;

    private User getAuthenticatedUser(String token) {
        String email = jwtService.extractUsername(token.replace("Bearer ", ""));
        return userService.getUserByEmail(email);
    }

    // AÑADIR A FAVORITOS
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{productId}")
    public ResponseEntity<String> addFavorite(@RequestHeader("Authorization") String token, @PathVariable Long productId) {
        User user = getAuthenticatedUser(token);
        favoriteService.addFavorite(user.getId(), productId);
        return ResponseEntity.ok("Producto agregado a favoritos");
    }

    //  LISTAR FAVORITOS DEL USUARIO AUTENTICADO
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<Favorite>> getFavorites(@RequestHeader("Authorization") String token) {
        User user = getAuthenticatedUser(token);
        return ResponseEntity.ok(favoriteService.getFavorites(user.getId()));
    }

    // ELIMINAR UN FAVORITO POR ID
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{favoriteId}")
    public ResponseEntity<String> removeFavorite(@RequestHeader("Authorization") String token, @PathVariable Long favoriteId) {
        User user = getAuthenticatedUser(token);
        favoriteService.removeFavorite(user.getId(), favoriteId);
        return ResponseEntity.ok("Producto eliminado de favoritos");
    }
}
