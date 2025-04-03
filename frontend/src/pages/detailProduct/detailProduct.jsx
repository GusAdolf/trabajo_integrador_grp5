import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Button,
    IconButton,
    Popover,
    CircularProgress,
    TextField,
    Avatar
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    CalendarMonth as CalendarMonthIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Window as WindowIcon,
    HourglassBottom as HourglassBottomIcon,
    Group as GroupIcon,
    Info as InfoIcon,
    MonetizationOn as MonetizationOnIcon
} from "@mui/icons-material";

import Swal from "sweetalert2";
import RedesSociales from "../../components/redesSociales/RedesSociales";
import { useAuth } from "../../context/AuthContext"; // Para obtener la sesión del usuario
import Login from "../../components/login/Login"; // Importa el modal de login

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;
const PLACEHOLDER_IMAGE = "https://picsum.photos/600/400";

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtenemos la información del usuario
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateError, setDateError] = useState(null);
    const [selectedPeople, setSelectedPeople] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false); // Controla la apertura del modal de login

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products/${id}`);
                if (!response.ok) throw new Error("No se pudo cargar el producto.");

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    const price = product.price ?? 0;
    const availableDates = product.availabilitySet?.map((availability) => availability.date) || [];
    const maxCapacity =
        product.availabilitySet?.reduce((acc, availability) => acc + availability.capacity, 0) ||
        product.capacity;
    const totalPrice = selectedPeople * price;

    // Manejo de la cantidad de personas
    const handlePeopleChange = (increment) => {
        setSelectedPeople((prev) => {
            const newCount = prev + increment;
            return newCount >= 1 && newCount <= maxCapacity ? newCount : prev;
        });
    };

    // Permitir ingresar manualmente la cantidad de personas
    const handleManualPeopleChange = (e) => {
        const inputValue = parseInt(e.target.value, 10);
        if (Number.isNaN(inputValue) || inputValue < 1) {
            setSelectedPeople(1);
        } else if (inputValue > maxCapacity) {
            setSelectedPeople(maxCapacity);
        } else {
            setSelectedPeople(inputValue);
        }
    };

    // Manejo del Popover del calendario
    const handleDateClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const isOpen = Boolean(anchorEl);

    // Función para manejar la selección de fecha y cerrar el calendario
    const handleCalendarChange = (date) => {
        const dateString = date.toISOString().split("T")[0];
        if (availableDates.includes(dateString)) {
            setSelectedDate(date);
            setDateError(null);
        } else {
            setDateError("Fecha no disponible");
        }
        handleClosePopover();
    };

    // Función para aplicar estilos a las fechas en el calendario
    const tileClassName = ({ date, view }) => {
        if (view === "month") {
            const dateString = date.toISOString().split("T")[0];
            if (availableDates.includes(dateString)) {
                return "available-date";
            } else {
                return "unavailable-date";
            }
        }
    };

    // Función para manejar la acción de reservar
    const handleGoToReview = () => {
        // Validar que el usuario tenga sesión activa
        if (!user) {
            setLoginOpen(true);
            return;
        }

        // Validar fecha seleccionada
        if (!selectedDate || dateError) {
            Swal.fire({
                icon: "error",
                title: "Error al reservar",
                text: dateError
                    ? "Has escogido una fecha no disponible"
                    : "No has seleccionado una fecha disponible",
            });
            return;
        }

        // Navegar hacia la nueva página de revisión de reserva
        navigate("/booking-review", {
            state: {
                product,
                selectedDate,
                selectedPeople,
                totalPrice
            }
        });
    };

    return (
        <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <RedesSociales />
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{ mt: 3 }}>
                    <img
                        src={product.imageSet?.[0]?.imageUrl || PLACEHOLDER_IMAGE}
                        alt="Principal"
                        style={{
                            width: "100%",
                            height: 400,
                            objectFit: "cover",
                            borderRadius: "8px"
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={1} sx={{ mt: 2}}>
                        {product.imageSet?.slice(1, 5).map((img, index, arr) => (
                            <Grid item xs={6} key={index} sx={{ position: "relative" }}>
                                <img
                                    src={img.imageUrl}
                                    alt={`Imagen ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: 194,
                                        objectFit: "cover",
                                        borderRadius: "12px"
                                    }}
                                />
                                {index === arr.length - 1 && product.imageSet.length >= 5 && (
                                    <Button
                                        variant="contained"
                                        startIcon={<WindowIcon />}
                                        onClick={() =>
                                            navigate("/gallery", {
                                                state: { product }
                                            })
                                        }
                                        sx={{
                                            position: "absolute",
                                            bottom: 10,
                                            right: 10,
                                            fontSize: "0.8rem",
                                            padding: "5px 10px",
                                            backgroundColor: "#ffff",
                                            color: "#FD346E",
                                            width: "60%",
                                            "&:hover": {
                                                backgroundColor: "#FD346E",
                                                color: "#ffff",
                                            },
                                        }}
                                    >
                                        Ver Más
                                    </Button>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Typography variant="h4" fontWeight="bold" sx={{ mt: 2, color: "#1C274C" }}>
                {product.name}
            </Typography>

            <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#1C274C"}}>
                        Descripción
                    </Typography>
                    <Typography>{product.description}</Typography>

                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#1C274C"}}>
                        Detalles
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                        {product.features.map((feature) => (
                            <Box
                                key={feature.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    pb: 1,
                                    borderBottom: "1px solid #FD346E",
                                    width: "100%",
                                }}
                            >
                                <Avatar
                                    src={feature.iconUrl}
                                    alt={feature.name}
                                    sx={{
                                        width: 18,
                                        height: 18,
                                        bgcolor: "#FFD1DC",
                                        p: 1,
                                    }}
                                />
                                <Typography variant="body1" fontWeight="bold">
                                    {feature.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            p: 4,
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: 3,
                            minHeight: 400,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, color: "#1C274C", fontSize: "1.8rem"}}>
                            Reserva tu experiencia
                        </Typography>

                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<CalendarMonthIcon />}
                            onClick={handleDateClick}
                            sx={{
                                mb: 3,
                                color: "#FD346E",
                                borderColor: "#FD346E",
                                fontSize: { xs: "0.8rem", sm: "1rem" }
                            }}
                        >
                            {selectedDate
                                ? selectedDate.toLocaleDateString()
                                : "Seleccione Fecha"}
                        </Button>

                        <Popover
                            open={isOpen}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        >
                            <Calendar
                                onChange={handleCalendarChange}
                                value={selectedDate || new Date()}
                                tileClassName={tileClassName}
                                minDate={new Date()}
                                selectRange={false}
                                showDoubleView={true}
                            />
                        </Popover>

                        {dateError && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {dateError}
                            </Typography>
                        )}

                        <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 3 }}>
                            <IconButton
                                onClick={() => handlePeopleChange(-1)}
                                disabled={selectedPeople <= 1}
                            >
                                <RemoveIcon
                                    sx={{ color: selectedPeople > 1 ? "#FD346E" : "gray" }}
                                />
                            </IconButton>

                            <TextField
                                type="number"
                                value={selectedPeople}
                                onChange={handleManualPeopleChange}
                                sx={{ width: 60, mx: 2 }}
                                inputProps={{
                                    min: 1,
                                    max: maxCapacity,
                                    style: { textAlign: "center", paddingLeft: "20px" }
                                }}
                            />

                            <IconButton
                                onClick={() => handlePeopleChange(1)}
                                disabled={selectedPeople >= maxCapacity}
                            >
                                <AddIcon
                                    sx={{ color: selectedPeople < maxCapacity ? "#FD346E" : "gray" }}
                                />
                            </IconButton>
                        </Box>

                        <Typography fontWeight="bold" sx={{ mb: 3, fontSize: "1.5rem", color: "#1C274C"}}>
                            Total: ${totalPrice.toFixed(2)}
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                p: 1.5,
                                fontSize: "1.1rem",
                                backgroundColor: "#FD346E"
                            }}
                            onClick={handleGoToReview}
                        >
                            Reservar
                        </Button>

                        <style>
                            {`
                .available-date {
                  color: #FD346E !important;
                }
                .unavailable-date {
                  text-decoration: line-through !important;
                  color: #D3D3D3 !important;
                }
              `}
                        </style>
                    </Box>
                </Grid>
            </Grid>
            {/* Modal de Login */}
            <Login open={loginOpen} handleClose={() => setLoginOpen(false)} />
        </Box>
    );
};