import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, IconButton, Popover, CircularProgress } from "@mui/material";
import { DateRange } from "react-date-range";
import {
    CalendarMonth as CalendarMonthIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Person as PersonIcon,
    Window as WindowIcon,
    HourglassBottom as HourglassBottomIcon,
    Group as GroupIcon,
    Info as InfoIcon,
    MonetizationOn as MonetizationOnIcon
} from "@mui/icons-material";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const API_BASE_URL = "http://localhost:8080";
const PLACEHOLDER_IMAGE = "https://picsum.photos/600/400";

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPeople, setSelectedPeople] = useState(1);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);
    const [anchorEl, setAnchorEl] = useState(null);

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

    if (loading) return <Box sx={{ textAlign: "center", mt: 5 }}><CircularProgress /></Box>;
    if (error) return <Box sx={{ textAlign: "center", mt: 5 }}><Typography color="error">{error}</Typography></Box>;

    // Manejo de la cantidad de personas
    const handlePeopleChange = (increment) => {
        setSelectedPeople((prev) => {
            const newCount = prev + increment;
            return newCount >= 1 && newCount <= product.capacity ? newCount : prev;
        });
    };

    // Manejadores para el selector de rango de fechas
    const handleDateClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const isOpen = Boolean(anchorEl);
    const price = product.price ?? 0;
    const totalPrice = selectedPeople * price;

    return (
        <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
            {/* Sección de imágenes con cuadrícula */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{ mt: 6 }}>
                    <img
                        src={product.imageSet?.[0]?.imageUrl || PLACEHOLDER_IMAGE}
                        alt="Principal"
                        style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "8px" }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={1} sx={{ mt: 5 }}>
                        {product.imageSet?.slice(1, 5).map((img, index, arr) => (
                            <Grid item xs={6} key={index} sx={{ position: "relative" }}>
                                <img src={img.imageUrl} alt={`Imagen ${index + 1}`} 
                                    style={{ width: "100%", height: 194, objectFit: "cover", borderRadius: "12px" }} 
                                />
                                {index === arr.length - 1 && product.imageSet.length > 5 && (
                                    <Button
                                        variant="contained"
                                        startIcon={<WindowIcon />}
                                        onClick={() => navigate("/gallery", { state: { product } })} // ✅ Modificación para enviar `product`
                                        sx={{
                                            position: "absolute",
                                            bottom: 10,
                                            right: 10,
                                            fontSize: "0.8rem",
                                            padding: "5px 10px",
                                            backgroundColor: "#FD346E"
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

            {/* Título */}
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>{product.name}</Typography>

            {/* Sección de descripción y detalles */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" fontWeight="bold">Descripción</Typography>
                    <Typography>{product.description}</Typography>

                    {/* Detalles */}
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Detalles</Typography>
                    <Box sx={{ mt: 2 }}>
                        {[
                            { icon: <HourglassBottomIcon sx={{ color: "#FD346E" }} />, label: "Duración:", value: product.duration },
                            { icon: <GroupIcon sx={{ color: "#FD346E" }} />, label: "Cupo:", value: product.capacity },
                            { icon: <MonetizationOnIcon sx={{ color: "#FD346E" }} />, label: "Precio por persona:", value: `$${price.toFixed(2)}` },
                            { icon: <InfoIcon sx={{ color: "#FD346E" }} />, label: "Incluido:", value: "Consultar detalles" }
                        ].map((detail, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, borderBottom: "2px solid #FD346E", pb: 1 }}>
                                {detail.icon}
                                <Typography fontWeight="bold">{detail.label}</Typography>
                                <Typography color="textSecondary">{detail.value}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                {/* Sección de reserva con selector de rango de fechas */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 4, backgroundColor: "white", borderRadius: "8px", boxShadow: 3, minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Reserva tu experiencia</Typography>

                        {/* Selector de fechas con popover y doble calendario */}
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<CalendarMonthIcon />}
                            onClick={handleDateClick}
                            sx={{ mb: 3, color: "#FD346E", borderColor: "#FD346E" }}
                        >
                            Seleccione Fechas
                        </Button>
                        <Popover open={isOpen} anchorEl={anchorEl} onClose={handleClosePopover} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                            <DateRange ranges={dateRange} onChange={(ranges) => setDateRange([ranges.selection])} months={2} direction="horizontal" rangeColors={["#00CED1"]} showDateDisplay={false} />
                        </Popover>

                        {/* Selector de personas centrado */}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3, mb: 3 }}>
                            <PersonIcon sx={{ color: "#FD346E", mr: 1 }} />
                            <IconButton onClick={() => handlePeopleChange(-1)} sx={{ color: "#FD346E" }}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ mx: 2 }}>{selectedPeople}</Typography>
                            <IconButton onClick={() => handlePeopleChange(1)} sx={{ color: "#FD346E" }}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Typography fontWeight="bold" sx={{ mb: 3 }}>Total: ${totalPrice.toFixed(2)}</Typography>

                        <Button variant="contained" fullWidth sx={{ p: 2, fontSize: "1.1rem", backgroundColor: "#FD346E" }}>
                            Reservar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};


// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Grid, Select, MenuItem, Button, IconButton, FormControl, InputLabel, Dialog } from "@mui/material";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import PeopleIcon from "@mui/icons-material/People";
// import InfoIcon from "@mui/icons-material/Info";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import CloseIcon from "@mui/icons-material/Close";
// import WindowIcon from '@mui/icons-material/Window';

// const dummyProduct = {
//     id: 1,
//     name: "Aventura en la Montaña",
//     description: "Disfruta de una experiencia única explorando montañas y disfrutando de la naturaleza.",
//     duration: "4 horas",
//     capacity: "10 personas",
//     included: ["Guía turístico", "Equipo de seguridad", "Transporte ida y vuelta"],
//     pricePerPerson: 50,
//     images: [
//         "https://picsum.photos/600/400?random=1",
//         "https://picsum.photos/200/400?random=2",
//         "https://picsum.photos/200/400?random=3",
//         "https://picsum.photos/200/400?random=4",
//         "https://picsum.photos/200/400?random=5",
//         "https://picsum.photos/600/400?random=6"
//     ]
// };

// export const ProductDetail = () => {
//     const [selectedDate, setSelectedDate] = useState();
//     const [selectedPeople, setSelectedPeople] = useState();
//     const [openGallery, setOpenGallery] = useState(false);
//     const { id } = useParams();
//     const product = dummyProduct;

//     const handleDateChange = (event) => {
//         setSelectedDate(event.target.value);
//     };

//     const handlePeopleChange = (event) => {
//         setSelectedPeople(event.target.value);
//     };

//     return (
//         <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} md={8} sx={{ mt: 6 }}>
//                     <img src={product.images[0]} alt="Principal" style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "8px" }} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Grid container spacing={1} sx={{ mt: 5, position: "relative" }}>
//                         {product.images.slice(1, 5).map((img, index) => (
//                             <Grid item xs={6} key={index} sx={{ position: "relative" }}>
//                                 <img src={img} alt={`random ${index + 1}`} style={{ width: "100%", height: 194, objectFit: "cover", borderRadius: "8px" }} />
//                                 {index === 3 && (
//                                     <Button
//                                         variant="contained"
                                        
//                                         startIcon={<WindowIcon/>}
//                                         onClick={() => setOpenGallery(true)}
//                                         sx={{
//                                             position: "absolute",
//                                             bottom: 10,
//                                             right: 10,
//                                             fontSize: "0.8rem",
//                                             padding: "5px 10px",
//                                             backgroundColor: 
//                                         }}
//                                     >
//                                         Ver Más
//                                     </Button>
//                                 )}
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>{product.name}</Typography>
//             <Grid container spacing={3} sx={{ mt: 2 }}>
//                 <Grid item xs={12} md={8}>
//                     <Typography variant="h6" fontWeight="bold">Descripción</Typography>
//                     <Typography>{product.description}</Typography>
//                     <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Detalles</Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//                         <CalendarMonthIcon />
//                         <Typography variant="body1">Duración:</Typography>
//                         <Typography color="textSecondary">{product.duration}</Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//                         <PeopleIcon />
//                         <Typography variant="body1">Cupo:</Typography>
//                         <Typography color="textSecondary">{product.capacity}</Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//                         <InfoIcon />
//                         <Typography variant="body1">Incluido:</Typography>
//                         <Typography color="textSecondary">{product.included.join(", ")}</Typography>
//                     </Box>
//                 </Grid>
//             </Grid>

//             {/* Diálogo de la galería de imágenes */}
//             <Dialog open={openGallery} onClose={() => setOpenGallery(false)} fullWidth maxWidth="md">
//                 <Box sx={{ p: 3 }}>
//                     <IconButton onClick={() => setOpenGallery(false)} sx={{ position: "absolute", top: 10, right: 10 }}>
//                         <CloseIcon />
//                     </IconButton>
//                     <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Galería de imágenes</Typography>
//                     <Grid container spacing={2}>
//                         {product.images.map((img, index) => (
//                             <Grid item xs={12} sm={6} md={4} key={index}>
//                                 <img src={img} alt={`Imagen ${index + 1}`} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//             </Dialog>
//         </Box>
//     );
// };
