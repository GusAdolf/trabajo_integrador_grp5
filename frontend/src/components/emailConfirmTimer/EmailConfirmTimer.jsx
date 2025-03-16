// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

const successModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 0,
    width: "600px",
    minHeight: "auto",
    borderRadius: "10px",
};

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

export const EmailConfirmTimer = ({ open, onTimerEnd }) => {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (!open) return;
        if (timeLeft === 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [open, timeLeft]);

    useEffect(() => {
        if (open && timeLeft === 0 && onTimerEnd) {
            onTimerEnd();
        }
    }, [open, timeLeft, onTimerEnd]);

    return (
        <Modal
            open={open}
            onClose={() => {}}
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-description"
        >
            <Box sx={successModalStyle}>
                {}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m: 2,
                    }}
                >

                    <SendIcon
                        sx={{
                            fontSize: "40px",
                            color: "#1C274C",
                            transform: "rotate(335deg)",
                        }}/>
                </Box>
                {/* Título */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m: 2,
                    }}
                >
                    <Typography
                        id="success-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "#1C274C", fontWeight: "bold", fontSize: "24px" }}
                    >
                        Registro Exitoso
                    </Typography>
                </Box>
                {/* Cuerpo del modal con mensaje y timer */}
                <Box
                    sx={{
                        backgroundColor: "#00CED1",
                        borderRadius: "80px 0 10px 10px",
                        height: "auto",
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    <Typography
                        id="success-modal-description"
                        sx={{ mt: 2, color: "white", textAlign: "center" }}
                    >
                        ¡Hola! En unos momentos recibirás un correo confirmando tu registro exitoso.
                        No olvides revisar tu bandeja de entrada o la carpeta de spam.
                    </Typography>
                    <Typography variant="h4" sx={{ color: "white", mt: 2 }}>
                        {formatTime(timeLeft)}
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
};

EmailConfirmTimer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onTimerEnd: PropTypes.func.isRequired,
};