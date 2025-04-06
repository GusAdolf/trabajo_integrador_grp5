// src/components/reservaConfirmada/ReservaConfirmada.jsx

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    IconButton,
    Box
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import { jsPDF } from 'jspdf';
/*import { sendBookingEmail } from '../../services/emailService';*/
import { useNavigate } from 'react-router-dom';

const ReservaConfirmada = ({ reserva, onClose }) => {
    const navigate = useNavigate();
    // Genera un número de confirmación aleatorio (se muestra en el PDF y en el encabezado)
    const [confirmationNumber] = useState(() => Math.floor(Math.random() * 1000000));
    // Genera un número aleatorio que indica el proceso de reserva
    const [processNumber] = useState(() => Math.floor(Math.random() * 1000000));
    const [loadingEmail, setLoadingEmail] = useState(false);

    // Función para generar y descargar el PDF de confirmación con formato personalizado
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Título principal
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(253, 52, 110); // Color #FD346E
        doc.text("Confirmación de Reserva", pageWidth / 2, 20, { align: "center" });

        // Línea horizontal para separar el encabezado
        doc.setDrawColor(200);
        doc.setLineWidth(0.5);
        doc.line(20, 25, pageWidth - 20, 25);

        // Contenido en color negro y estilo normal
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Número de confirmación: ${confirmationNumber}`, 20, 35);
        doc.text(`Número de proceso: ${processNumber}`, 20, 45);
        doc.text(`Producto: ${reserva.product.name}`, 20, 55);
        doc.text(`Fecha: ${new Date(reserva.availability.date).toLocaleDateString()}`, 20, 65);
        doc.text(`Cantidad: ${reserva.quantity}`, 20, 75);
        doc.text(`Total: $${(reserva.product.price * reserva.quantity).toFixed(2)}`, 20, 85);

        // Nota final en estilo itálico
        doc.setFont("helvetica", "italic");
        doc.text(
            "Se enviará un correo electrónico con los detalles de su reservación.",
            20,
            95
        );

        // Guarda el PDF con el nombre que incluya el número de confirmación
        doc.save(`Reserva_${confirmationNumber}.pdf`);
    };

    const handleConfirm = () => {
        onClose();
        navigate('/booking');
        /*setLoadingEmail(true);
        try {
            const token = localStorage.getItem('token');
            await sendBookingEmail(reserva.id, token);
            // Espera 2 segundos y luego cierra el modal y redirige al home
            setTimeout(() => {
                onClose();
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error al enviar el correo de confirmación:', error);
            // Aún si ocurre un error, continuar el flujo
            setTimeout(() => {
                onClose();
                navigate('/');
            }, 2000);
        } finally {
            setLoadingEmail(false);
        }*/
    };

    // Función para cancelar y cerrar el modal sin enviar correo
    const handleCancel = () => {
        onClose();
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            {/* Encabezado con ícono de pregunta */}
            <DialogTitle sx={{ textAlign: 'center' }}>
                <HelpOutlineIcon sx={{ fontSize: 50, color: '#00CED1' }} />
            </DialogTitle>

            {/* Contenido principal */}
            <DialogContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    ¡Tu reservación ha sido procesada con éxito!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Te hemos enviado un correo con los detalles de tu reserva. No olvides de revisar tu carpeta de spam.
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Número de proceso: {processNumber}
                </Typography>

                {/* Ícono para descargar el PDF de confirmación */}
                <Box sx={{ mt: 2 }}>
                    <IconButton onClick={handleDownloadPDF}>
                        <GetAppIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="caption" display="block">
                        Descarga tu confirmación en PDF
                    </Typography>
                </Box>
            </DialogContent>

            {/* Botones de acción */}
            <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    disabled={loadingEmail}
                    sx={{
                        backgroundColor: '#FD346E',
                        color: '#fff',
                        mr: 2,
                        '&:hover': { backgroundColor: '#fd5f8e' }
                    }}
                >
                    {loadingEmail ? 'Enviando...' : 'Aceptar'}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                        borderColor: '#999',
                        color: '#999',
                        '&:hover': { borderColor: '#666', color: '#666' }
                    }}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReservaConfirmada;
