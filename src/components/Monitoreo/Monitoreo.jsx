import React from 'react';
import GraficaIngresos from './GraficaIngresos/GraficaIngresos';
import GraficaGastos from './GraficaGastos/GraficaGastos';
import GraficaAhorros from './GraficaAhorros/GraficaAhorros';
import GraficaDeudas from './GraficaDeudas/GraficaDeudas';
import GraficaPresupuesto from './GraficaPresupuesto/GraficaPresupuesto';
import ResumenFinanciero from './ResumenFinanciero/ResumenFinanciero';
import MetasFinancieras from './MetasFinancieras/MetasFinancieras';
import EducacionFinanciera from './EducacionFinanciera/EducacionFinanciera';


import './Monitoreo.css'; // Asegúrate de crear un archivo CSS o usar estilos en línea

export default function Monitoreo() {
    return (
        <div className="grafico-container">
            <GraficaGastos />
            <GraficaIngresos />
            <GraficaAhorros />
            <GraficaDeudas />
            <GraficaPresupuesto />
            <ResumenFinanciero />
            <MetasFinancieras />
            <EducacionFinanciera />

        </div>
    );
}
