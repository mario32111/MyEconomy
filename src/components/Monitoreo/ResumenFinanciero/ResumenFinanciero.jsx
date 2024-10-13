import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ResumenFinanciero = () => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Resumen Financiero
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tu situación financiera actual
                </Typography>
                <Typography variant="body1" component="div" sx={{ marginTop: 1 }}>
                    Patrimonio Neto: $35,000
                </Typography>
                <Typography variant="body1" component="div">
                    Inversiones: $23,000
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ResumenFinanciero;
