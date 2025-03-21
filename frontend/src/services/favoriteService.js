import Swal from "sweetalert2";

const API_URL = "https://backend-production-147b.up.railway.app"

export const getFavorites = async (token) => {
    try {
        const bearerToken = `Bearer ${localStorage.getItem("token")}`;
        const response = await fetch(`${API_URL}/favorites`, {
            headers: {
                Authorization: bearerToken,
            },
        });

        if (!response.ok) {
            const responseText = await response.text();
            Swal.fire({
                icon: "error",
                title: "Error al obtener favoritos",
                text: responseText,
            });
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener favoritos:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al obtener tus productos favoritos.",
        });
        return [];
    }
};

export const addFavorite = async ( productId) => {
    try {
        const bearerToken = `Bearer ${localStorage.getItem("token")}`;
        const response = await fetch(`${API_URL}/favorites/${productId}`, {
            method: "POST",
            headers: {
                Authorization: bearerToken,
            },
        });

        const responseText = await response.text();

        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "No se pudo agregar a favoritos",
                text: responseText,
            });
            return null;
        }

        Swal.fire({
            icon: "success",
            title: "Agregado a favoritos ❤️",
            text: responseText,
        });

        return responseText;
    } catch (error) {
        console.error("Error al agregar a favoritos:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al agregar a favoritos.",
        });
        return null;
    }
};

export const removeFavorite = async ( favoriteId) => {
    console.log("🚀 ~ removeFavorite ~ favoriteId:", favoriteId)
    try {
        const bearerToken = `Bearer ${localStorage.getItem("token")}`;
        const response = await fetch(`${API_URL}/favorites/${favoriteId}`, {
            method: "DELETE",
            headers: {
                Authorization: bearerToken,
            },
        });

        const responseText = await response.text();

        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "No se pudo eliminar de favoritos",
                text: responseText,
            });
            return null;
        }

        Swal.fire({
            icon: "success",
            title: "Eliminado de favoritos",
            text: responseText,
        });

        return responseText;
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al eliminar el favorito.",
        });
        return null;
    }
};

