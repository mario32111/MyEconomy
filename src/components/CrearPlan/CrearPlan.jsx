import React from 'react';
import PricingCards from '../CrearPlan/PricingCards/PricingCards';
import { Box, Typography } from '@mui/material';
import NavBarPrincipal from '../NavBarPrincipal/NavBarPrincipal';


export default function CrearPlan() {
    return (

        <>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Es el plan que mejor se ajuste a ti.
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Cualquier plan te da acceso completo a nuestra plataforma
                </Typography>
            </Box>
            <PricingCards />
        </>


    );
}
