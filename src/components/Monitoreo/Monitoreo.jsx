import React, { useState } from 'react';
import GraficaIngresos from './GraficaIngresos/GraficaIngresos';
import GraficaGastos from './GraficaGastos/GraficaGastos';
import GraficaAhorros from './GraficaAhorros/GraficaAhorros';
import GraficaDeudas from './GraficaDeudas/GraficaDeudas';
import GraficaPresupuesto from './GraficaPresupuesto/GraficaPresupuesto';
import ResumenFinanciero from './ResumenFinanciero/ResumenFinanciero';
import MetasFinancieras from './MetasFinancieras/MetasFinancieras';
import EducacionFinanciera from './EducacionFinanciera/EducacionFinanciera';
import NavBarPrincipal from '../NavBarPrincipal/NavBarPrincipal';
import { Grow } from '@mui/material';

import './Monitoreo.css'; // Asegúrate de tener un archivo CSS o usar estilos en línea

export default function Monitoreo() {
    const [checked, setChecked] = useState(true); // Estado para el control de la animación

    const components = [
        GraficaGastos,
        GraficaIngresos,
        GraficaAhorros,
        GraficaDeudas,
        GraficaPresupuesto,
        ResumenFinanciero,
        MetasFinancieras,
        EducacionFinanciera
    ];

    return (
        <div className="grafico-container">
            {components.map((Component, index) => (
                <Grow key={index} in={checked} timeout={1000}>
                    <div>
                        <Component />
                    </div>
                </Grow>
            ))}
        </div>
    );
}
