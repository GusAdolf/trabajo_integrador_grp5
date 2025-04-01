const API_URL =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;

export const resendRegistrationEmail = async () => {
    const token = localStorage.getItem("resend-token");

    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    };

    const response = await fetch(`${API_URL}/send-email/welcome`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al reenviar el correo: ${errorText}`);
    };
  
    localStorage.removeItem("resend-token");
};
