import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#121212', color: '#FFFFFF', padding: '40px 20px', mt: 'auto' }}>
      <Grid container spacing={4}>
        {/* Sección de enlaces principales */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            MyEconomy
          </Typography>
          <Typography variant="body2" gutterBottom>
            Mejoramos tus finanzas a través de asesoría y herramientas de control financiero.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton aria-label="Facebook" color="inherit">
              <FacebookIcon sx={{ color: '#FFFFFF' }} />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit">
              <TwitterIcon sx={{ color: '#FFFFFF' }} />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit">
              <InstagramIcon sx={{ color: '#FFFFFF' }} />
            </IconButton>
          </Box>
        </Grid>

        {/* Sección de enlaces rápidos */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Enlaces Rápidos
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="/servicios" underline="hover" sx={{ color: '#FFFFFF' }}>
              Servicios
            </Link>
            <Link href="/nosotros" underline="hover" sx={{ color: '#FFFFFF' }}>
              Nosotros
            </Link>
            <Link href="/contacto" underline="hover" sx={{ color: '#FFFFFF' }}>
              Contacto
            </Link>
            <Link href="/blog" underline="hover" sx={{ color: '#FFFFFF' }}>
              Blog
            </Link>
          </Box>
        </Grid>

        {/* Sección de contacto */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Contáctanos
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <EmailIcon sx={{ color: '#FFFFFF', marginRight: 1 }} />
            <Typography variant="body2">
              <Link href="mailto:contacto@myeconomy.com" underline="hover" sx={{ color: '#FFFFFF' }}>
                contacto@myeconomy.com
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <PhoneIcon sx={{ color: '#FFFFFF', marginRight: 1 }} />
            <Typography variant="body2">
              <Link href="tel:+521234567890" underline="hover" sx={{ color: '#FFFFFF' }}>
                +52 123 456 7890
              </Link>
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
            Lunes a Viernes: 9:00 AM - 6:00 PM
          </Typography>
        </Grid>
      </Grid>

      {/* Sección de política de privacidad */}
      <Box sx={{ borderTop: `1px solid #FFFFFF`, mt: 4, pt: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
              &copy; {new Date().getFullYear()} MyEconomy. Todos los derechos reservados.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Link href="/privacidad" underline="hover" sx={{ color: '#FFFFFF', marginRight: 2 }}>
              Política de Privacidad
            </Link>
            <Link href="/terminos" underline="hover" sx={{ color: '#FFFFFF' }}>
              Términos de Servicio
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
