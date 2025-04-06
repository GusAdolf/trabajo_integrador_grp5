import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", marginTop: "50px" }}>
        Cargando perfil...
      </p>
    );
  }

  const [firstname, lastname] = user.name.split(" ");

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <style>
        {`
          /* Tarjeta principal */
          .user-info-card {
            width: 90%;           /* Ocupa el 90% del contenedor */
            max-width: 700px;     /* Se limita a 700px en pantallas grandes */
            margin: 0 auto 40px;
            padding: 20px;
            border-radius: 12px;
            background-color: #fff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          /* Contenedor de avatar + datos en grid */
          .user-info-container {
            display: grid;
            grid-template-columns: 100px 1fr; /* Avatar fijo + resto flexible */
            gap: 20px;                       /* Espacio entre columnas */
            align-items: center;
          }

          /* En pantallas pequeñas, avatar y datos en una sola columna */
          @media (max-width: 600px) {
            .user-info-container {
              grid-template-columns: 1fr;
              text-align: center;
            }
          }

          /* Avatar */
          .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #00CED1;
            color: #fff;
            font-size: 36px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
          }

          /* Título */
          .user-name {
            color: #003366;
            margin: 0;
            margin-bottom: 10px;
          }

          /* Texto de campos */
          .user-text {
            font-size: 16px;
            color: #333;
            margin: 8px 0;
          }

          /* Rol (admin / usuario) */
          .user-role {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            padding: 5px 10px;
            border-radius: 8px;
            display: inline-block;
            margin-top: 10px;
          }

          .admin {
            color: #d9534f;
            background-color: #f8d7da;
          }

          .user {
            color: #5cb85c;
            background-color: #d4edda;
          }
        `}
      </style>

      {/* Tarjeta de datos de usuario */}
      <div className="user-info-card">
        <div className="user-info-container">
          {/* Avatar */}
          <div className="avatar">
            {user.avatar || user.name[0]}
          </div>

          {/* Datos del usuario */}
          <div>
            <h2 className="user-name">Mis Datos</h2>
            <p className="user-text">
              <strong>Nombre:</strong> {firstname}
            </p>
            <p className="user-text">
              <strong>Apellido:</strong> {lastname}
            </p>
            <p className="user-text">
              <strong>Email:</strong> {user.email}
            </p>
            <p
              className={`user-role ${user.isAdmin ? "admin" : "user"}`}
            >
              {user.isAdmin ? "Administrador" : "Usuario"}
            </p>
          </div>
        </div>
      </div>


      <div style={{ flex: "1 1 auto", alignContent: "center", padding: "20px" }}>
            <h1 style={{ color: "#5234FD", margin: 0, marginBottom: "10px" }}>
            ✨ BIENVENIDO ✨
            </h1>
      </div>
      {/* Grid de opciones de navegación */}
      <div className="grid-opciones-nav">
        
        {/* Card: Admin (solo si es admin) */}
        {user.isAdmin && (
          <a href="/admin" className="card-link">
            <div className="card">
              <img
                src="https://cdn-icons-png.freepik.com/512/1570/1570286.png"
                alt="Admin"
                style={{ width: "60px", marginBottom: "10px" }}
              />
              <h2 style={{ color: "#5234FD", margin: 0, marginBottom: "10px" }}>
                Admin
            </h2>
              <p>Tu centro de control. Gestiona todo de forma simple y eficiente.</p>
            </div>
          </a>
        )} 
        
        {/* Card: Home */}
        <a href="/" className="card-link">
          <div className="card">
            <img
              src="https://cdn-icons-png.freepik.com/512/1318/1318158.png"
              alt="Inicio"
              style={{ width: "60px", marginBottom: "10px"}}
            />
            <h2 style={{ color: "#5234FD", margin: 0, marginBottom: "10px" }}>
              Inicio
            </h2>
            <p>Descubre lo mejor desde la primera vista. ¡Bienvenido a tu espacio!</p>
          </div>
        </a>

        {/* Card: Favoritos */}
        <a href="/favorites" className="card-link">
          <div className="card">
            <img
              src="https://cdn-icons-png.freepik.com/512/18083/18083300.png"
              alt="Favoritos"
              style={{ width: "60px", marginBottom: "10px" }}
            />
            <h2 style={{ color: "#5234FD", margin: 0, marginBottom: "10px" }}>
            Favoritos
            </h2>
            <p>Tus elegidos, siempre a mano. Encuentra lo que amas en un solo lugar.</p>
          </div>
        </a>

        {/* Card: Mis Reservas */}
        <a href="/booking" className="card-link">
          <div className="card">
            <img
              src="https://cdn-icons-png.freepik.com/512/12727/12727991.png"
              alt="Mis Reservas"
              style={{ width: "60px", marginBottom: "10px" }}
            />
            <h2 style={{ color: "#5234FD", margin: 0, marginBottom: "10px" }}>
            Mis Reservas
            </h2>
            <p>No te pierdas nada. Consulta y gestiona tus reservas fácilmente.</p>
          </div>
        </a>

        {/* Card: Mis Reseñas */}
        <a href="/my-reviews" className="card-link">
          <div className="card">
            <img
              src="https://cdn-icons-png.freepik.com/512/8937/8937558.png"
              alt="Mis Reseñas"
              style={{ width: "60px", marginBottom: "10px" }}
            />
            <h2 style={{ color: "#5234FD", margin: 0, marginBottom: "10px" }}>
            Mis Reseñas
            </h2>
            <p>Tu voz importa. Revisa y comparte tus experiencias.</p>
          </div>
        </a>

      </div>
    </div>
  );
};

