import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const EducacionFinanciera = () => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Educación Financiera
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Aprender sobre finanzas personales
                </Typography>
                <ul>
                    <li>
                        <Typography variant="body1">Descubre los conceptos básicos de la inversión y la creación de riqueza.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">Estrategias de Gestión de Deudas.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">Planifica para el jubilo y proteger tu salud financiera y prepararte para una jubilación cómoda.</Typography>
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
};

export default EducacionFinanciera;
