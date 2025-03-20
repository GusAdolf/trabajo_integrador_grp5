// src/politicas/RecursosPoliticas.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { Box, Typography, Button } from '@mui/material';

const RecursosPoliticas = ({ onClose }) => {
    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                <div style={{ textAlign: 'center' }}>
                    <p>
                Políticas de Privacidad
                    </p>
                </div>
            </Typography>
            <Typography variant="body1" paragraph>

            </Typography>
            <Typography variant="body1" paragraph>
                <span style={{ color: '#FD346E', fontWeight: 'bold', textAlign: 'justify'}} > <strong>1. Introducción: </strong> </span>
                <br />
                <div style={{ textAlign: 'justify' }}>
                    <p>
                    Bienvenido a Xplora+, una plataforma dedicada a conectar a los usuarios con experiencias únicas, como tours, deportes extremos, catas de vino y más. Al utilizar nuestro sitio web, aceptas las siguientes políticas y condiciones de uso.
                    </p>
                </div>
                    </Typography>
            <Typography variant="body1" paragraph>
                <span style={{ color: "#FD346E", fontWeight: 'bold' }}> <strong>2. Uso del Sitio Web:</strong></span>
                <br />
                <div style={{ textAlign: 'justify' }}>
                    <p>
                Xplora+ proporciona información sobre experiencias ofrecidas por proveedores externos.
                Los usuarios deben ser mayores de 18 años para reservar actividades que impliquen consumo de alcohol u otras restricciones de edad.
                Nos reservamos el derecho de modificar la información del sitio en cualquier momento sin previo aviso.
                    </p>
                </div>
                    </Typography>
            <Typography variant="body1" paragraph>
                <span style={{ color: "#FD346E", fontWeight: 'bold' }}> <strong>3. Reservas y Pagos:</strong> </span>
                <br />
                <div style={{ textAlign: 'justify' }}>
                    <p>
                Todas las reservas están sujetas a disponibilidad y confirmación por parte del proveedor del servicio.
                Los precios mostrados en el sitio web pueden cambiar sin previo aviso.
                Se aceptan pagos mediante los métodos indicados en la plataforma. Xplora+ no almacena información de pago.
                    </p>
                </div>
            </Typography>
            <Typography variant="body1" paragraph>
                <span style={{ color: "#FD346E", fontWeight: 'bold' }}> <strong>4. Cancelaciones y Reembolsos:</strong></span>
                <br />
                <div style={{ textAlign: 'justify' }}>
                    <p>
                Cada experiencia tiene su propia política de cancelación establecida por el proveedor.
                En caso de cancelación por parte del usuario, se aplicarán las condiciones específicas de cada servicio.
                Si un proveedor cancela una actividad, Xplora+ facilitará la comunicación para gestionar un reembolso o reprogramación.
                    </p>
                </div>
                    </Typography>
            <Typography variant="body1" paragraph>
                <span style={{ color: "#FD346E", fontWeight: 'bold' }}> <strong>5. Responsabilidad y Seguridad:</strong></span>
                <br />
                <div style={{ textAlign: 'justify' }}>
                    <p>
                Xplora+ actúa únicamente como intermediario entre el usuario y los proveedores de experiencias.
                Los usuarios deben cumplir con los requisitos de seguridad y restricciones de cada actividad.
                No nos hacemos responsables por accidentes, daños o pérdidas ocurridas durante las experiencias.
                    </p>
                </div>
                    </Typography>
            <Typography variant="body1" paragraph>
                <span style={{ color: "#FD346E", fontWeight: 'bold' }}> <strong>6. Privacidad y Protección de Datos:</strong></span>
                <br />
                <div style={{ textAlign: 'justify' }}>
                    <p>
                La información personal de los usuarios será tratada conforme a nuestra Política de Privacidad.
                No compartiremos datos personales con terceros sin consentimiento, salvo en los casos requeridos por ley.
                    </p>
                </div>
                    </Typography>
            <Typography variant="body1" paragraph>
                <span style={{ color: "#FD346E", fontWeight: 'bold' }}> <strong>7. Modificaciones a la Política:</strong></span>
                <br />
                <div style={{ textAlign: 'justify' }}>
                    <p>
                Xplora+ se reserva el derecho de modificar esta política en cualquier momento. Los cambios serán publicados en el sitio web y entrarán en vigencia inmediatamente.
                    </p>
                </div>

            </Typography>
            <Typography variant="body1" paragraph>
                <span style={{ color: 'black', fontWeight: 'bold', textAlign: 'justify' }}> <strong>
                    Si tienes alguna pregunta sobre nuestras políticas, contáctanos a través de xplora+@gmail.com</strong></span>
                <br />
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
            <Button variant="contained" onClick={onClose} sx={{ mt: 2, background:"#00CED1" }}>
                Cerrar
            </Button>
            </div>
        </Box>
    );
};

// Agrega la validación de las propiedades
RecursosPoliticas.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose debe ser una función y es requerida
};

export default RecursosPoliticas;