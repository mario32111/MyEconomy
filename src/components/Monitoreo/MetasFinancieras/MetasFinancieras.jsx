import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MetasFinancieras = () => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Metas Financieras
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tus objetivos financieros personales
                </Typography>
                <Typography variant="body1" component="div" sx={{ marginTop: 1 }}>
                    Ahorro para Jubilación: $500/mes
                </Typography>
                <Typography variant="body1" component="div">
                    Pago de Deuda Entrada para Vivienda: $50,000
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MetasFinancieras;
