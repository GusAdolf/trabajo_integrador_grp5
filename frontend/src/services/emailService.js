// src/services/emailService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const sendBookingEmail = async (bookingId, authToken) => {
    try {
        // Verifica si el token ya contiene el prefijo "Bearer"
        const token = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/send-email/booking`,
            { bookingId },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al enviar el correo de confirmación de reserva:', error);
        throw error;
    }
};
