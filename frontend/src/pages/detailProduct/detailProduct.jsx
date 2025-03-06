import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, IconButton, TextField } from "@mui/material";
import { CalendarMonth as CalendarMonthIcon, People as PeopleIcon, Info as InfoIcon, Add as AddIcon, Remove as RemoveIcon, Window as WindowIcon, HourglassBottom as HourglassBottomIcon, Group as GroupIcon, Person as PersonIcon, DirectionsCar as DirectionsCarIcon, Coffee as CoffeeIcon, Map as MapIcon, Cake as CakeIcon, WineBar as WineBarIcon, CameraAlt as CameraAltIcon } from "@mui/icons-material";

// Datos de producto (simulado)
const dummyProduct = {
    id: 1,
    name: "Aventura en la Montaña",
    description: "Sumérgete en una experiencia única donde cada momento te llevará a descubrir escenarios sorprendentes, llenos de belleza y emoción. Déjate envolver por la majestuosidad del entorno mientras recorres paisajes fascinantes que despertarán todos tus sentidos. Con cada paso, descubrirás rincones asombrosos, secretos bien guardados y la riqueza de un destino que te invita a conectar con lo extraordinario.Acompañado por expertos apasionados, vivirás una aventura enriquecedora, llena de historias, aprendizaje y momentos inolvidables. Ya sea explorando nuevos horizontes, disfrutando de la armonía de la naturaleza o desafiando tus propios límites, esta será una vivencia que quedará grabada en tu memoria. ¿Estás listo para embarcarte en esta experiencia irrepetible?",
    duration: "6 horas",
    capacity: "20 personas",
    included: [
        { icon: <DirectionsCarIcon sx={{ color: "#FD346E" }} />, text: "Transporte turístico ida y vuelta" },
        { icon: <CoffeeIcon sx={{ color: "#FD346E" }} />, text: "Desayuno: sándwich o galleta + cereal bar + jugo" },
        { icon: <MapIcon sx={{ color: "#FD346E" }} />, text: "Guía Oficial de Turismo" },
        { icon: <CakeIcon sx={{ color: "#FD346E" }} />, text: "1 Vino al cumpleañero" },
        { icon: <WineBarIcon sx={{ color: "#FD346E" }} />, text: "1 Vino a los grupos de 4 a más" },
        { icon: <CameraAltIcon sx={{ color: "#FD346E" }} />, text: "Foto conmemorativa" }
    ],
    pricePerPerson: 50,
    images: [
        "https://picsum.photos/600/400?random=1",
        "https://picsum.photos/200/400?random=2",
        "https://picsum.photos/200/400?random=3",
        "https://picsum.photos/200/400?random=4",
        "https://picsum.photos/200/400?random=5"
    ]
};

export const ProductDetail = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedPeople, setSelectedPeople] = useState(1);
    const navigate = useNavigate();
    const product = dummyProduct;

    // Funciones de manejo de eventos
    const handleDateChange = (event) => setSelectedDate(event.target.value);
    const handlePeopleChange = (increment) => {
        setSelectedPeople((prev) => {
            const newCount = prev + increment;
            return newCount >= 1 && newCount <= 20 ? newCount : prev;
        });
    };

    return (
        <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
            {/* Sección de imágenes */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{ mt: 6 }}>
                    <img
                        src={product.images[0]}
                        alt="Principal"
                        style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "8px" }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={1} sx={{ mt: 5 }}>
                        {product.images.slice(1).map((img, index) => (
                            <Grid item xs={6} key={index} sx={{ position: "relative" }}>
                                <img src={img} alt={`Imagen ${index + 1}`} style={{ width: "100%", height: 194, objectFit: "cover", borderRadius: "8px" }} />
                                {index === 3 && (
                                    <Button
                                        variant="contained"
                                        startIcon={<WindowIcon />}
                                        onClick={() => navigate("/gallery")}
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
                            { icon: <GroupIcon sx={{ color: "#FD346E" }} />, label: "Cupo:", value: product.capacity }
                        ].map((detail, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, borderBottom: "2px solid #FD346E", pb: 1 }}>
                                {detail.icon}
                                <Typography fontWeight="bold">{detail.label}</Typography>
                                <Typography color="textSecondary">{detail.value}</Typography>
                            </Box>
                        ))}

                        {/* Lista de elementos incluidos con icono de info */}
                        <Box sx={{ mb: 1, pb: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <InfoIcon sx={{ color: "#FD346E" }} />
                                <Typography fontWeight="bold">Incluido:</Typography>
                            </Box>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                {product.included.map((item, index) => (
                                    <Grid item xs={6} sm={4} key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        {item.icon}
                                        <Typography color="textSecondary">{item.text}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Grid>

                {/* Sección de reserva con calendario incrustado */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 4, backgroundColor: "white", borderRadius: "8px", boxShadow: 3, minHeight: 380 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Reserva tu experiencia</Typography>

                        {/* Calendario incrustado */}
                        <TextField
                            type="date"
                            fullWidth
                            value={selectedDate}
                            onChange={handleDateChange}
                            sx={{ mb: 3, p: 1 }}
                        />

                        {/* Selección de personas */}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                            <PersonIcon sx={{ color: "#FD346E" }} />
                            <IconButton onClick={() => handlePeopleChange(-1)} sx={{ color: "#FD346E" }}><RemoveIcon /></IconButton>
                            <Typography variant="h6">{selectedPeople}</Typography>
                            <IconButton onClick={() => handlePeopleChange(1)} sx={{ color: "#FD346E" }}><AddIcon /></IconButton>
                        </Box>

                        {/* Precio total */}
                        <Typography fontWeight="bold" sx={{ mb: 3 }}>Total: ${selectedPeople * product.pricePerPerson}</Typography>

                        {/* Botón de reservar más grande */}
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ p: 2, fontSize: "1.1rem", backgroundColor: "#FD346E" }}
                        >
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
