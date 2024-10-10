import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { FaFacebookF, FaInstagram, FaTimes } from 'react-icons/fa';

const MiniFooter = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 'calc(100vh)', // Calcula el 100% de la altura de la pantalla menos 100px
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: '10px 20px',
        color: '#ffffff',
        width: '100%'
      }}
    >
      {/* Left Side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography variant="body2">© MyEconomy</Typography>
        <Typography variant="body2">•</Typography>
        <Link href="/blog" underline="none" color="inherit">
          Politicas de privacidad
        </Link>
        <Typography variant="body2">•</Typography>
        <Link href="/store" underline="none" color="inherit">
          Terminos de servicio
        </Link>
      </Box>

      {/* Right Side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <FaTimes style={{ cursor: 'pointer' }} />
        <FaFacebookF style={{ cursor: 'pointer' }} />
        <FaInstagram style={{ cursor: 'pointer' }} />
      </Box>
    </Box>
  );
};

export default MiniFooter;
