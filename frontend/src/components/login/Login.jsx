import { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// eslint-disable-next-line react/prop-types
const Login = ({ open, handleClose, handleLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const [showPassword, setShowPassword] = useState(false);


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/;


    const validateFields = (emailValue, passwordValue) => {
        const messages = [];

        if (!emailValue.trim()) {
            messages.push("El email es obligatorio.");
        } else if (!emailRegex.test(emailValue)) {
            messages.push("Ingresa un email válido.");
        }

        if (!passwordValue) {
            messages.push("La contraseña es obligatoria.");
        } else if (!passwordRegex.test(passwordValue)) {
            messages.push(
                "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
            );
        }

        return messages;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateFields(email, password);

        if (validationErrors.length > 0) {
            setError(validationErrors.join(" "));
            return;
        }

        handleLogin(email, password);
        setError("");
        setEmail("");
        setPassword("");
        handleClose();
    };


    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setError("");
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                { }
                <Box sx={{ height: "90px" }}>
                    <img
                        src="src/assets/logo.svg"
                        alt="logo xplora+"
                        style={{
                            width: "150px",
                            height: "auto",
                            position: "absolute",
                            top: 10,
                            left: 10,
                        }}
                    />
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: "#00CED1",
                            color: "white",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                { }
                <Typography variant="h6" textAlign="center" fontWeight="bold" gutterBottom>
                    Inicia sesión para acceder a lo mejor de Xplora+
                </Typography>

                { }
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Correo electrónico"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={handleInputChange(setEmail)}
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {error && (
                        <Typography color="error" textAlign="center">
                            {error}
                        </Typography>
                    )}

                    <Typography
                        variant="body2"
                        textAlign="right"
                        sx={{ color: "#00CED1", cursor: "pointer", mt: 1 }}
                    >
                        ¿Has olvidado tu contraseña?
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, backgroundColor: "#00CED1", color: "white" }}
                        type="submit"
                    >
                        Iniciar sesión
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default Login;