package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Favorite;
import com.xplora.backend.entity.Product;
import com.xplora.backend.entity.User;
import com.xplora.backend.repository.IFavoriteRepository;
import com.xplora.backend.repository.IProductRepository;
import com.xplora.backend.repository.IUserRepository;
import com.xplora.backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private IFavoriteRepository favoriteRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IProductRepository productRepository;

    @Override
    public void addFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Verificar si el producto ya está en favoritos
        if (favoriteRepository.existsByUserAndProduct(user, product)) {
            throw new RuntimeException("El producto ya está en favoritos");
        }

        Favorite favorite = new Favorite(user, product);
        favoriteRepository.save(favorite);
    }

    @Override
    public List<Favorite> getFavorites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return favoriteRepository.findByUser(user);
    }

    @Override
    public void removeFavorite(Long userId, Long favoriteId) { // 🔥 Ahora recibe userId y favoriteId
        Favorite favorite = favoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new RuntimeException("Favorito no encontrado"));

        // Verificar que el usuario autenticado es el dueño del favorito
        if (!favorite.getUser().getId().equals(userId)) {
            throw new RuntimeException("No tienes permiso para eliminar este favorito");
        }

        favoriteRepository.delete(favorite);
    }
}
