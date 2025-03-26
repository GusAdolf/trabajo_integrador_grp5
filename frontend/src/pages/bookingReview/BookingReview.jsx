import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CalendarMonth as CalendarMonthIcon,
  LocationOn as LocationOnIcon,
  Group as GroupIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import { createBooking } from '../../services/bookingService';
import Login from "../../components/login/Login";

// Obtener datos del usuario almacenados en localStorage
const getUserData = () => {
  const user = JSON.parse(localStorage.getItem('userData')) || {};
  return user;
};

const BookingReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, selectedDate, selectedPeople, totalPrice } = location.state || {};
  const userStorage = getUserData();

  // Estados para datos del usuario editables
  const [firstName, setFirstName] = useState(userStorage.firstName || '');
  const [lastName, setLastName] = useState(userStorage.lastName || '');
  const [email, setEmail] = useState(userStorage.email || '');
  const [phone, setPhone] = useState('');

  // Manejo de errores básicos
  const [errors, setErrors] = useState({});

  // Método de pago
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Controlar la apertura del modal de Login
  const [openLogin, setOpenLogin] = useState(false);
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  // Eliminamos la simulación de usuario logueado; esta función ahora no guarda token ni datos en localStorage.
  const handleLogin = (emailValue, passwordValue) => {
    // Aquí puedes implementar la lógica real de login, si lo deseas
    setOpenLogin(false);
  };

  // ELIMINAR PRODUCTO
  const handleRemoveProduct = () => {
    Swal.fire({
      title: '¿Deseas eliminar este producto de la reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FD346E',
      cancelButtonColor: '#999',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  // VALIDACIONES
  const validateForm = () => {
    const newErrors = {};

    // Nombres: min 5 caracteres
    if (!firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido.';
    } else if (firstName.trim().length < 5) {
      newErrors.firstName = 'El nombre debe tener al menos 5 caracteres.';
    }

    // Apellidos: min 5 caracteres
    if (!lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido.';
    } else if (lastName.trim().length < 5) {
      newErrors.lastName = 'El apellido debe tener al menos 5 caracteres.';
    }

    // Email
    if (!email.trim()) {
      newErrors.email = 'El correo es requerido.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Ingresa un correo electrónico válido.';
      }
    }

    // Teléfono: solo números
    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es requerido.';
    } else {
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(phone.trim())) {
        newErrors.phone = 'El teléfono solo debe contener números.';
      }
    }

    // Si se selecciona método tarjeta, validar campos
    if (paymentMethod === 'tarjeta') {
      if (!cardNumber.trim()) {
        newErrors.cardNumber = 'Número de tarjeta requerido.';
      }
      if (!expiryDate.trim()) {
        newErrors.expiryDate = 'Fecha de expiración requerida.';
      }
      if (!cvv.trim()) {
        newErrors.cvv = 'CVV requerido.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CONFIRMAR RESERVA
  const handleConfirmBooking = async () => {
    // Validar formulario
    if (!validateForm()) {
      return;
    }

    // Cuadro de confirmación de la reservación
    Swal.fire({
      title: '¿Confirmar esta reservación?',
      text: 'Verifica que tus datos sean correctos antes de continuar.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FD346E',
      cancelButtonColor: '#999',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Verificar token (sesión)
          const token = localStorage.getItem('token');
          if (!token) {
            // Si NO hay token, abrimos el modal de login
            setOpenLogin(true);
            return;
          }

          // Buscar la disponibilidad que coincida con la fecha
          const formattedSelectedDate = new Date(selectedDate).toISOString().split('T')[0];
          const selectedAvailability = product.availabilitySet?.find(
            (a) => a.date === formattedSelectedDate
          );

          if (!selectedAvailability) {
            Swal.fire({
              icon: 'error',
              title: 'Error de disponibilidad',
              text: 'No se encontró disponibilidad para la fecha elegida.'
            });
            return;
          }

          // Armar payload
          const bookingData = {
            product_id: product.id,
            availability_id: selectedAvailability.id,
            quantity: selectedPeople
          };

          // Llamar al servicio
          const bookingResponse = await createBooking(bookingData);

          if (bookingResponse) {
            Swal.fire({
              icon: 'success',
              title: 'Reserva confirmada',
              text: 'Tu reserva se ha realizado con éxito.',
              confirmButtonColor: '#FD346E',
            }).then(() => {
              // Redirigir A PAGINA DE CONFIRMACIÓN POR AGREGAR
              navigate('/');
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // Si no hay producto, mostramos un aviso
  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">
          No hay información de producto para mostrar. Por favor regresa al detalle.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
      {/* Modal de Login */}
      <Login
        open={openLogin}
        handleClose={handleCloseLogin}
        handleLogin={handleLogin}
      />

      {/* Encabezado */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold' }}>
          Revisa tu pedido
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* COLUMNA IZQUIERDA */}
        <Grid item xs={12} md={8}>
          <Card sx={{ position: 'relative', p: 2 }}>
            {/* Imagen principal */}
            <CardMedia
              component="img"
              height="300"
              sx={{ objectFit: 'cover', borderRadius: 2 }}
              image={
                product.imageSet?.[0]?.imageUrl ||
                'https://picsum.photos/200/300'
              }
              alt={product.name}
            />

            {/* Contenido debajo de la imagen */}
            <CardContent sx={{ position: 'relative' }}>
              {/* Título del producto */}
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {product.name}
              </Typography>

              {/* Fecha */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarMonthIcon sx={{ color: '#00A8A8', mr: 1 }} />
                <Typography>
                  {new Date(selectedDate).toLocaleDateString()}
                </Typography>
              </Box>

              {/* Ciudad, País */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ color: '#00A8A8', mr: 1 }} />
                <Typography>
                  {product.city?.name}, {product.city?.country}
                </Typography>
              </Box>

              {/* Cantidad de personas */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <GroupIcon sx={{ color: '#00A8A8', mr: 1 }} />
                <Typography>
                  {selectedPeople} persona(s) x ${product.price?.toFixed(2)}
                </Typography>
              </Box>

              {/* Icono de basurero */}
              <IconButton
                onClick={handleRemoveProduct}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: '#FD346E',
                }}
              >
                <DeleteIcon />
              </IconButton>

              {/* Total en esquina inferior derecha */}
              <Typography
                variant="h6"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  color: '#FD346E',
                  fontWeight: 'bold'
                }}
              >
                Total: ${totalPrice?.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* COLUMNA DERECHA */}
        <Grid item xs={12} md={4}>
          {/* BOX DATOS DEL USUARIO */}
          <Box
            sx={{
              p: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 2,
              mb: 2
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#00CED1' }}>
              Datos de la información del usuario
            </Typography>

            {/* Nombres */}
            <Typography sx={{ fontWeight: 'bold' }}>Nombres</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ingresa tus nombres"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors({ ...errors, firstName: '' });
              }}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              sx={{ mb: 2 }}
            />

            {/* Apellidos */}
            <Typography sx={{ fontWeight: 'bold' }}>Apellidos</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ingresa tus apellidos"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrors({ ...errors, lastName: '' });
              }}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              sx={{ mb: 2 }}
            />

            {/* Correo */}
            <Typography sx={{ fontWeight: 'bold' }}>Correo Electrónico</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: '' });
              }}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />

            {/* Teléfono */}
            <Typography sx={{ fontWeight: 'bold' }}>Teléfono móvil</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="0991234567"
              value={phone}
              onChange={(e) => {
                // Filtramos para que solo acepte dígitos
                const onlyNums = e.target.value.replace(/\D/g, '');
                setPhone(onlyNums);
                setErrors({ ...errors, phone: '' });
              }}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              sx={{ mb: 2 }}
            />
          </Box>

          {/* BOX MÉTODO DE PAGO */}
          <Box
            sx={{
              p: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 2,
              mb: 2
            }}
          >
            <FormLabel id="payment-method-label" sx={{ fontWeight: 'bold', mb: 1, color: '#00CED1' }}>
              Selecciona un método de pago
            </FormLabel>
            <RadioGroup
              aria-labelledby="payment-method-label"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="tarjeta"
                control={<Radio />}
                label={<Typography>Tarjeta de crédito</Typography>}
              />
              <FormControlLabel
                value="googlepay"
                control={<Radio />}
                label={<Typography>Google Pay</Typography>}
              />
            </RadioGroup>

            {paymentMethod === 'tarjeta' && (
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 'bold' }}>Número de tarjeta</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                    setErrors({ ...errors, cardNumber: '' });
                  }}
                  error={Boolean(errors.cardNumber)}
                  helperText={errors.cardNumber}
                  sx={{ mb: 2 }}
                />

                <Typography sx={{ fontWeight: 'bold' }}>Fecha de expiración</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => {
                    setExpiryDate(e.target.value);
                    setErrors({ ...errors, expiryDate: '' });
                  }}
                  error={Boolean(errors.expiryDate)}
                  helperText={errors.expiryDate}
                  sx={{ mb: 2 }}
                />

                <Typography sx={{ fontWeight: 'bold' }}>CVV</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => {
                    setCvv(e.target.value);
                    setErrors({ ...errors, cvv: '' });
                  }}
                  error={Boolean(errors.cvv)}
                  helperText={errors.cvv}
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
          </Box>

          {/* TOTAL A PAGAR */}
          <Box
            sx={{
              p: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 2,
              mb: 2
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#00CED1', mb: 1 }}>
              Total a pagar
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              ${totalPrice?.toFixed(2)}
            </Typography>
          </Box>

          {/* BOTÓN PARA CONFIRMAR RESERVA */}
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#FD346E', p: 2 }}
            onClick={handleConfirmBooking}
          >
            Confirmar Reserva
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingReview;
