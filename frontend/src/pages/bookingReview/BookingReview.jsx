import React, { useState, useEffect } from 'react';
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
import { getProfile } from '../../services/productService';
import Login from "../../components/login/Login";
import ReservaConfirmada from "../../components/reservaConfirmada/ReservaConfirmada";

const BookingReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Datos que vienen desde ProductDetail
  const { product, selectedDate, selectedPeople, totalPrice } = location.state || {};

  const [user, setUser] = useState(null);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname]   = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');

  // Estados para errores
  const [errors, setErrors] = useState({});

  // Método de pago y datos de tarjeta
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber]       = useState('');
  const [expiryDate, setExpiryDate]       = useState('');
  const [cvv, setCvv]                     = useState('');

  // Control modal de Login
  const [openLogin, setOpenLogin] = useState(false);
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  const handleLogin = (emailValue, passwordValue) => {
    // Lógica de login
    setOpenLogin(false);
    // Recargar datos de usuario aquí
    // loadUserData();
  };

  // Modal de confirmación de reserva
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  // Función para eliminar el producto de la reserva (regresa a la página anterior)
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

  // Cargar datos del usuario (si hay token)
  const loadUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await getProfile(token);
        if (userData) {
          setUser(userData);

          // Ajusta estos campos segun backend:
          setFirstname(userData.firstname || '');
          setLastname(userData.lastname || '');
          setEmail(userData.email || '');
          setPhone(userData.phone || '');
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!firstname.trim()) {
      newErrors.firstname = 'El nombre es requerido.';
    } else if (firstname.trim().length < 5) {
      newErrors.firstname = 'El nombre debe tener al menos 5 caracteres.';
    }

    if (!lastname.trim()) {
      newErrors.lastname = 'El apellido es requerido.';
    } else if (lastname.trim().length < 5) {
      newErrors.lastname = 'El apellido debe tener al menos 5 caracteres.';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo es requerido.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Ingresa un correo electrónico válido.';
      }
    }

    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es requerido.';
    } else {
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(phone.trim())) {
        newErrors.phone = 'El teléfono solo debe contener números.';
      }
    }

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

  // Confirmar reserva
  const handleConfirmBooking = async () => {
    if (!validateForm()) {
      return;
    }

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
        const swalInstance = Swal.fire({
          title: 'Procesando reserva',
          text: 'Por favor espera...',
          icon: 'info',
          showConfirmButton: false,
          didOpen: async () => {
            // Revisar si hay token
            const token = localStorage.getItem('token');
            if (!token) {
              setOpenLogin(true);
              return;
            }

            // Buscar disponibilidad según fecha
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

            try {
              /// Crear la reserva
              const bookingResponse = await createBooking(bookingData);
              if (bookingResponse) {
                swalInstance.close();
                // Mostramos modal de reserva confirmada
                setReservaConfirmada(bookingResponse);
                setOpenConfirmModal(true);
              }
            } catch (error) {
              Swal.fire('Error', error.message, 'error');
            }
          }
        })
      }
    });
  };

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

      {/* Modal de confirmación de reserva */}
      {openConfirmModal && reservaConfirmada && (
        <ReservaConfirmada
          reserva={reservaConfirmada}
          onClose={() => setOpenConfirmModal(false)}
        />
      )}

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
        {/* Info producto */}
        <Grid item xs={12} md={8}>
          <Card sx={{ position: 'relative', p: 2 }}>
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
            <CardContent sx={{ position: 'relative' }}>
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

              {/* Ciudad */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ color: '#00A8A8', mr: 1 }} />
                <Typography>
                  {product.city?.name}, {product.city?.country}
                </Typography>
              </Box>

              {/* Personas */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <GroupIcon sx={{ color: '#00A8A8', mr: 1 }} />
                <Typography>
                  {selectedPeople} persona(s) x ${product.price?.toFixed(2)}
                </Typography>
              </Box>

              {/* Botón eliminar */}
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

              {/* Total */}
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

        {/* Datos del usuario + Pago */}
        <Grid item xs={12} md={4}>
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

            {/* firstname */}
            <Typography sx={{ fontWeight: 'bold' }}>Nombres</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ingresa tus nombres"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                setErrors({ ...errors, firstname: '' });
              }}
              error={Boolean(errors.firstname)}
              helperText={errors.firstname}
              sx={{ mb: 2 }}
            />

            {/* lastname */}
            <Typography sx={{ fontWeight: 'bold' }}>Apellidos</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ingresa tus apellidos"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
                setErrors({ ...errors, lastname: '' });
              }}
              error={Boolean(errors.lastname)}
              helperText={errors.lastname}
              sx={{ mb: 2 }}
            />

            {/* email */}
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

            {/* phone */}
            <Typography sx={{ fontWeight: 'bold' }}>Teléfono móvil</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="0991234567"
              value={phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, '');
                setPhone(onlyNums);
                setErrors({ ...errors, phone: '' });
              }}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              sx={{ mb: 2 }}
            />
          </Box>

          {/* Métodos de pago */}
          <Box
            sx={{
              p: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 2,
              mb: 2
            }}
          >
            <FormLabel
              id="payment-method-label"
              sx={{ fontWeight: 'bold', mb: 1, color: '#00CED1' }}
            >
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
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Ícono Tarjeta de Crédito */}
                    <img
                      src="https://cdn-icons-png.freepik.com/512/14082/14082959.png?ga=GA1.1.1251921206.1743563784"
                      alt="Tarjeta"
                      style={{ width: 24, height: 24 }}
                    />
                    <Typography>Tarjeta de crédito</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="googlepay"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Ícono Google Pay */}
                    <img
                      src="https://cdn-icons-png.freepik.com/512/6124/6124998.png?ga=GA1.1.1251921206.1743563784"
                      alt="Google Pay"
                      style={{ width: 24, height: 24 }}
                    />
                    <Typography>Google Pay</Typography>
                  </Box>
                }
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

          {/* Resumen final */}
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
