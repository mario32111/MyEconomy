import React from 'react';
import { Box, Container, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const AuthLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        padding: theme.spacing(3)
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Paper
            elevation={24}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {children}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AuthLayout;