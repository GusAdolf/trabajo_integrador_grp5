import { useAuth } from "../../context/AuthContext";

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", marginTop: "50px" }}>
        Cargando perfil...
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto 80px",
        padding: "40px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#00CED1",
          color: "#fff",
          fontSize: "36px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          textTransform: "uppercase",
        }}
      >
        {user.avatar || user.name[0]}
      </div>
      <h2 style={{ color: "#333", marginBottom: "10px" }}>
        Perfil del Usuario
      </h2>
      <p style={{ fontSize: "18px", color: "#555" }}>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p style={{ fontSize: "18px", color: "#555" }}>
        <strong>Email:</strong> {user.email}
      </p>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: user.isAdmin ? "#d9534f" : "#5cb85c",
          textTransform: "uppercase",
          padding: "5px 10px",
          borderRadius: "8px",
          display: "inline-block",
          backgroundColor: user.isAdmin ? "#f8d7da" : "#d4edda",
        }}
      >
        {user.isAdmin ? "Administrador" : "Usuario"}
      </p>
    </div>
  );
};
