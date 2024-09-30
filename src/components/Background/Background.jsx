import React from 'react';
import { Box } from '@mui/material';
import backgroundImage from '../../assets/img/fondo2.jpg';

const Background = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',    // Ajusta el tamaño de la imagen
          backgroundPosition: 'center', // Centra la imagen
          zIndex: -1,                  // Coloca el fondo detrás de Otros elementos
          opacity: 1,               // Ajusta la opacidad (valor entre 0 y 1)
          filter: 'blur(8px)',        // Aplica un desenfoque de 5 píxeles
        }}
      />
    );
  };
  
  export default Background;
  