// src/shared/components/UI/ParallaxSection/ResponsiveParallax.jsx
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const ResponsiveParallax = ({ 
  backgroundImage, 
  children, 
  height = '500px',
  mobileHeight = '300px',
  strength = 300,
  blur = 0,
  overlay = true,
  overlayColor = 'rgba(0,0,0,0.4)',
  backgroundColor
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  // Estilo para versión de escritorio con efecto parallax
  const desktopStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundColor: !backgroundImage ? backgroundColor : undefined,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: height,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };
  
  // Estilo para versión móvil sin efecto parallax
  const mobileStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundColor: !backgroundImage ? backgroundColor : undefined,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: mobileHeight,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  return (
    <Box sx={isDesktop ? desktopStyle : mobileStyle}>
      {/* Overlay opcional */}
      {overlay && (backgroundImage || backgroundColor) && (
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            zIndex: 1
          }}
        />
      )}
      
      {/* Efecto de blur opcional */}
      {blur > 0 && (
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: `blur(${blur}px)`,
            zIndex: 1
          }}
        />
      )}
      
      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default ResponsiveParallax;