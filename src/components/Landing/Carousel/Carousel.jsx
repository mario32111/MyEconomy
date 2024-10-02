import React, { useEffect, useState } from 'react';
import { Box, Paper, IconButton, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Importa los iconos
import image1 from '../../../assets/img/servicios/servicio1.jpg';
import image2 from '../../../assets/img/servicios/servicio2.jpg';
import image3 from '../../../assets/img/servicios/servicio3.jpg';
import image4 from '../../../assets/img/servicios/servicio4.jpg';
import image5 from '../../../assets/img/servicios/servicio5.jpg';
import image6 from '../../../assets/img/servicios/servicio6.jpg';
import image7 from '../../../assets/img/servicios/servicio7.jpg';
import image8 from '../../../assets/img/servicios/servicio8.jpg';

// Array de imágenes
const images = [image1, image2, image3, image4, image5, image6, image7, image8];

// Array de títulos y descripciones
const texts = [
    { title: 'Cursos sobre finanzas', description: 'Vuelvete un experto en finanzas' },
    { title: 'Chai AI', description: 'Una IA 100% destinada a mejorar las finanzas personales de los usuarios' },
    { title: 'Monitoreo', description: 'Ve el estado de tus finanzas en tiempo real' },
    { title: 'Notificaciones', description: 'Servicio de notificaciones, ideal para mantener al usuario alerta de cualquier cosa relacionada con sus finanzas' },
    { title: 'Gestion de servicios', description: 'Gestiona en tiempo real toos tus servicios basicos, digitales y suscripciones' },
    { title: 'Comparacion de tasas de interes', description: 'Ideal para ayudarte a decidir donde pedir tu proximo prestamo.' },
    { title: 'Ahorros', description: 'Posibilidad de ver en tiempo real lcomo se encuentran tus ahorros e inversiones' },
    { title: 'Presupuestos', description: 'Posibilidad de crear tu presupuesto personal o empresarial' },
];

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Cambia de imagen cada 3 segundos

        return () => clearInterval(timer);
    }, []);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
            <Paper elevation={3} sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#121212' }}>
                <img
                    src={images[activeIndex]}
                    alt={`Slide ${activeIndex + 1}`}
                    style={{ width: '100%', height: 'auto' }}
                />

                {/* Texto de título y descripción */}
                <Box sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
                    padding: 2,
                    borderRadius: 1,
                }}>
                    <Typography variant="h5" component="div">
                        {texts[activeIndex].title}
                    </Typography>
                    <Typography variant="body2" component="div">
                        {texts[activeIndex].description}
                    </Typography>
                </Box>

                {/* Botón anterior */}
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Color de fondo semitransparente
                        color: 'white',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                    aria-label="Anterior"
                >
                    <ArrowBack />
                </IconButton>

                {/* Botón siguiente */}
                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Color de fondo semitransparente
                        color: 'white',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                    aria-label="Siguiente"
                >
                    <ArrowForward />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default Carousel;
