package com.xplora.backend.service;

import com.xplora.backend.entity.Favorite;
import java.util.List;

public interface FavoriteService {
    void addFavorite(Long userId, Long productId);
    List<Favorite> getFavorites(Long userId);
    void removeFavorite(Long userId, Long favoriteId);
}
