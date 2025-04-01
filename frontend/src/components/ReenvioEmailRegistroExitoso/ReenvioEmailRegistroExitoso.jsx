// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import PropTypes from "prop-types";
import {Modal, Box, Typography, Button, IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { resendRegistrationEmail } from "../../services/resendRegistrationEmail";
import Swal from "sweetalert2";

const modalStyle = {
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



export const ReenvioEmailRegistroExitoso = ({ open, onClose }) => {
    const navigate = useNavigate();


    const handleResend = async() => {
        try {
            await resendRegistrationEmail();
            Swal.fire({
                icon: "success",
                title: "Correo reenviado",
                text: "El correo de registro exitoso ha sido reenviado.",
            });

            onClose();
        }catch (error) {
           
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });

        }
        
        
        navigate("/");
    };

    return (
        <Modal
            open={open}
            onClose={() => {onClose}}
            aria-labelledby="resend-modal-title"
            aria-describedby="resend-modal-description"
        >
            <Box sx={modalStyle}>
                {}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m: 2,
                    }}
                >
                    <SendIcon sx={{ fontSize: "40px", color: "#1C274C", transform: "rotate(335deg)", }} />
                    <IconButton
                        onClick={onClose}
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
                {/* Cuerpo del modal */}
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
                        id="resend-modal-description"
                        sx={{ mt: 2, color: "white", textAlign: "center" }}
                    >
                        ¡Hola! en unos momentos llegará un correo de tu registro exitoso.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#1C274C",
                            borderRadius: "10px",
                            width: "315px",
                            height: "62px",
                            mt: 2,
                            textTransform: "none",
                        }}
                        onClick={handleResend}
                    >
                        Reenviar el correo de registro exitoso
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

ReenvioEmailRegistroExitoso.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};