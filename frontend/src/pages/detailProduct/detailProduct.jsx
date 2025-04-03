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
    Avatar,
    MenuItem,
    FormControl,
    Select,
    Modal,
    Rating,
    Card,
    CardHeader,
    CardContent,
    Pagination

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
    MonetizationOn as MonetizationOnIcon,
    Close as CloseIcon
} from "@mui/icons-material";

import Swal from "sweetalert2";
import RedesSociales from "../../components/redesSociales/RedesSociales";

import { useAuth } from "../../context/AuthContext"; // Para obtener la sesión del usuario
import Login from "../../components/login/Login"; // Importa el modal de login

import { getBookings } from "../../services/bookingService";
import { getReviewsByProduct, createReview } from "../../services/reviewService";


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;
const PLACEHOLDER_IMAGE = "https://picsum.photos/600/400";

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtenemos la información del usuario
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // -- Estados para la reserva --
    const [selectedPeople, setSelectedPeople] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);

    const [dateError, setDateError] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false); // Controla la apertura del modal de login

    // -- Estados para reseñas --
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 2;

    // Verificación de booking
    const [hasBooking, setHasBooking] = useState(false);
    const [bookingId, setBookingId] = useState(null);

    // Orden de reseñas
    const [orderBy, setOrderBy] = useState("relevante"); 
    // “relevante” => score DESC (luego fecha DESC), “nuevo” => fecha DESC

    // -- Modal de nueva reseña: solo un comentario + score --
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [score, setScore] = useState(0);
    const [reviewComment, setReviewComment] = useState("");

    // Cargar producto
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

    // Cargar reseñas del producto
    useEffect(() => {
        const loadReviews = async () => {
            if (!id) return;
            const data = await getReviewsByProduct(id);
            setReviews(data || []);
        };
        loadReviews();
    }, [id]);

    //Verificar si el usuario tiene booking para este producto
    useEffect(() => {
        const checkUserBooking = async () => {
            try {
                const bookingList = await getBookings(); 
                // Filtramos las reservas que sean de este producto
                const productBookings = bookingList.filter(
                    (b) => b.product?.id === Number(id)
                );

                if (productBookings.length > 0) {
                    setHasBooking(true);
                    setBookingId(productBookings[0].id);
                } else {
                    setHasBooking(false);
                }
            } catch {
                setHasBooking(false);
            }
        };
        checkUserBooking();
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

    // Lógica de RESERVA

    const price = product.price ?? 0;
    const availableDates = product.availabilitySet?.map((avail) => avail.date) || [];
    const maxCapacity =
        product.availabilitySet?.reduce((acc, av) => acc + av.capacity, 0) ||
        product.capacity;
    const totalPrice = selectedPeople * price;

    const handlePeopleChange = (increment) => {
        setSelectedPeople((prev) => {
            const newCount = prev + increment;
            return newCount >= 1 && newCount <= maxCapacity ? newCount : prev;
        });
    };

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

    const handleDateClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const isOpen = Boolean(anchorEl);

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



    // Validar fecha seleccionada

    const handleGoToReview = () => {

        if (!user) {
            setLoginOpen(true);
            return;
        }
      
        if (!selectedDate || dateError) {
            Swal.fire({
                icon: "error",
                title: "Error al reservar",
                text: dateError
                    ? "Has escogido una fecha no disponible"
                    : "No has seleccionado una fecha disponible"
            });
            return;
        }

        navigate("/booking-review", {
            state: {
                product,
                selectedDate,
                selectedPeople,
                totalPrice
            }
        });
    };

    // Ordenar reseñas

    const sortedReviews = [...reviews];
    if (orderBy === "relevante") {
        // score DESC, luego fecha DESC
        sortedReviews.sort((a, b) => {
            if (b.score === a.score) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return b.score - a.score;
        });
    } else {
        // "Lo más nuevo": fecha DESC
        sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Paginación
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Manejo del Modal "Escribir una opinión"

    const handleOpenReviewModal = () => {
        // Verifica si hay token
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "No estás autenticado",
                text: "Debes iniciar sesión antes de escribir una opinión."
            });
            return;
        }
        // Verificar si el usuario tiene booking
        if (!hasBooking) {
            Swal.fire({
                icon: "info",
                title: "No puedes reseñar",
                text: "Debes contar con una reserva para este producto."
            });
            return;
        }
        setOpenReviewModal(true);
    };

    const handleCloseReviewModal = () => {
        setOpenReviewModal(false);
        setScore(0);
        setReviewComment("");
    };

    const handleSubmitReview = async () => {
        // Validaciones: comentario mínimo 15, máximo 250
        if (score < 1 || score > 5) {
            Swal.fire("Error", "Debes elegir un puntaje entre 1 y 5.", "error");
            return;
        }
        if (reviewComment.trim().length < 15) {
            Swal.fire("Error", "El comentario debe tener al menos 15 caracteres.", "error");
            return;
        }
        if (reviewComment.trim().length > 250) {
            Swal.fire("Error", "El comentario no puede superar 250 caracteres.", "error");
            return;
        }

        try {
            const payload = { score, comment: reviewComment };
            await createReview(bookingId, payload);

            Swal.fire("Éxito", "Tu reseña se ha guardado correctamente.", "success");

            handleCloseReviewModal();

            // Recargar reseñas
            const updatedReviews = await getReviewsByProduct(id);
            setReviews(updatedReviews || []);

            // Recargar producto para refrescar el averageScore
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            if (response.ok) {
                const updatedProduct = await response.json();
                setProduct(updatedProduct);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <RedesSociales />
            </Box>

            {/* Sección principal: Imágenes */}
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
                    <Grid container spacing={1} sx={{ mt: 2 }}>
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
                                            navigate("/gallery", { state: { product } })
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

            {/* Sección Descripción/Detalles + Sección Reserva */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {/* Descripción y detalles */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#1C274C"}}>
                        Descripción
                    </Typography>
                    <Typography>{product.description}</Typography>

                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#1C274C"}}>
                        Detalles
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ mt: 2 }}>
                        {[
                            {
                                icon: <HourglassBottomIcon sx={{ color: "#FD346E" }} />,
                                label: "Duración:",
                                value: "6 horas"
                            },
                            {
                                icon: <GroupIcon sx={{ color: "#FD346E" }} />,
                                label: "Cupo:",
                                value: maxCapacity
                            },
                            {
                                icon: <MonetizationOnIcon sx={{ color: "#FD346E" }} />,
                                label: "Precio por persona:",
                                value:  `$${price.toFixed(2)}`
                            },
                            {
                                icon: <InfoIcon sx={{ color: "#FD346E" }} />,
                                label: "Incluido:",
                                value: product.features.length > 0 ? null : "Consultar detalles"
                            }
                        ].map((detail, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 1,
                                    borderBottom: "2px solid #FD346E",
                                    pb: 1
                                }}
                            >
                                {detail.icon}
                                <Typography fontWeight="bold">{detail.label}</Typography>
                                {detail.value ? (
                                    <Typography color="textSecondary">{detail.value}</Typography>
                                ) : (
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    {product.features.map((feature) => (
                                        <Box
                                        key={feature.id}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                        >
                                            <Avatar
                                                src={feature.iconUrl}
                                                alt={feature.name}
                                                sx={{
                                                width: 18,
                                                height: 18,
                                                bgcolor: "transparent"
                                                }}
                                            />
                                            <Typography variant="body2">{feature.name}</Typography>
                                        </Box>
                                    ))}
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                    </Box>
                </Grid>

                {/* Box de reserva */}
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
                                borderColor: "#FD346E"
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


                        {/* Estilos para fechas disponibles/no disponibles */}

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


            {/* SECCIÓN de Reseñas */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                    Danos tu opinión
                </Typography>
            
                <Button 
                    variant="contained" 
                    onClick={handleOpenReviewModal}
                    sx={{ backgroundColor: "#FD346E", mb: 4 }}
                >
                    Escribir una opinión
                </Button>

                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                    Opiniones de nuestros clientes
                </Typography>

                {/* Puntuación media + Dropdown de orden */}
                <Grid container alignItems="center" sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Typography variant="h6">
                                {product.averageScore?.toFixed(1) ?? "0.0"}
                            </Typography>
                            <Rating 
                                value={Number(product.averageScore) || 0} 
                                readOnly
                                sx={{
                                    color: "#00CED1",
                                    "& .MuiRating-iconFilled": {
                                        color: "#00CED1",
                                    },
                                    "& .MuiRating-iconHover": {
                                        color: "#00CED1",
                                    },
                                }}
                            />
                            <Typography variant="body2">
                                ({product.countScores} reseñas)
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {/* Dropdown para ordenar */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <FormControl size="small" sx={{ width: 200 }}>
                                <Select
                                    value={orderBy}
                                    onChange={(e) => {
                                        setOrderBy(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <MenuItem value="relevante">Lo más relevante</MenuItem>
                                    <MenuItem value="nuevo">Lo más nuevo</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>

                {/* Listado (Cards) de reseñas con paginación */}
                {currentReviews.map((rev) => {
                    const fullName = rev.userFullName || "Usuario Desconocido";
                    const nameParts = fullName.split(" ");
                    const initials = nameParts
                        .map((part) => part.charAt(0).toUpperCase())
                        .join("")
                        .slice(0, 2);

                    const reviewDate = new Date(rev.createdAt).toLocaleDateString();

                    return (
                        <Card key={rev.id} sx={{ mb: 3, borderRadius: "16px" }}>
                            <CardHeader
                                sx={{
                                    backgroundColor: "#F0FFFF",
                                    borderTopLeftRadius: "16px",
                                    borderTopRightRadius: "16px"
                                }}
                                avatar={
                                    <Avatar sx={{ bgcolor: "#00CED1" }}>
                                        {initials}
                                    </Avatar>
                                }
                                title={
                                    <Typography sx={{ fontWeight: "bold", color: "#00CED1" }}>
                                        {fullName}
                                    </Typography>
                                }
                                action={
                                    <Box sx={{ textAlign: "right" }}>
                                        <Typography variant="subtitle2" sx={{ color: "#555" }}>
                                            {reviewDate}
                                        </Typography>
                                        <Rating 
                                            value={rev.score} 
                                            readOnly 
                                            size="small"
                                            sx={{
                                                color: "#00CED1",
                                                "& .MuiRating-iconFilled": {
                                                    color: "#00CED1",
                                                },
                                                "& .MuiRating-iconHover": {
                                                    color: "#00CED1",
                                                },
                                            }}
                                        />
                                    </Box>
                                }
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    {rev.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}

                {/* Paginación */}
                {sortedReviews.length > reviewsPerPage && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <Pagination 
                            count={totalPages} 
                            page={currentPage} 
                            onChange={handlePageChange} 
                            color="primary"
                        />
                    </Box>
                )}
            </Box>

            {/* MODAL para crear la reseña */}
            <Modal
                open={openReviewModal}
                onClose={handleCloseReviewModal}
                aria-labelledby="modal-review-title"
                aria-describedby="modal-review-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90%", md: 600 },
                        bgcolor: "#fff",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        color: "#00CED1"
                    }}
                >
                    <IconButton
                        onClick={handleCloseReviewModal}
                        sx={{ position: "absolute", top: 8, right: 8, color: "#00CED1" }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        id="modal-review-title"
                        textAlign="center"
                        sx={{ mb: 2, fontWeight: "bold" }}
                    >
                        ¿Cómo calificarías tu experiencia?
                    </Typography>

                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Rating
                            name="score"
                            value={score}
                            onChange={(event, newValue) => {
                                setScore(newValue);
                            }}
                            sx={{
                                color: "#00CED1",
                                "& .MuiRating-iconFilled": {
                                    color: "#00CED1",
                                },
                                "& .MuiRating-iconHover": {
                                    color: "#00CED1",
                                },
                            }}
                        />
                        <Typography variant="body2" sx={{ color: "#00CED1" }}>
                            1 estrella es malo, 5 estrellas es excelente
                        </Typography>
                    </Box>

                    <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{ mb: 2, fontWeight: "bold" }}
                    >
                        Cuéntanos más acerca de tu experiencia
                    </Typography>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Ingresa tu comentario (mín. 15, máx. 250 caracteres)"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        sx={{ mb: 3 }}
                        inputProps={{ maxLength: 250 }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSubmitReview}
                        sx={{
                            backgroundColor: "#00CED1",
                            "&:hover": { backgroundColor: "#00b3ba" }
                        }}
                    >
                        Enviar
                    </Button>
                </Box>
            </Modal>

        </Box>
    );
};