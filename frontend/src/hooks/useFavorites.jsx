import { useState } from "react";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";
import { useAuth } from "../context/AuthContext";

const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (productId) =>
    favorites.some((fav) => fav.product.id === productId);

  const toggleFavorite = async (productId) => {
    if (!user) return;

    try {
      const favorite = favorites.find((fav) => fav.product.id === productId);
      if (favorite) {
        await removeFavorite(favorite.id);
      } else {
        await addFavorite(productId);
      }
      fetchFavorites();
    } catch (error) {
      console.error("Error al modificar favorito:", error);
    }
  };

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const favorites = await getFavorites();
      setFavorites(favorites);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  };

  return { isFavorite, toggleFavorite };
};

export default useFavorites;
