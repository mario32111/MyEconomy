import React from 'react';
import GraficaIngresos from './GraficaIngresos/GraficaIngresos';
import GraficaGastos from './GraficaGastos/GraficaGastos';
import GraficaAhorros from './GraficaAhorros/GraficaAhorros';
import GraficaDeudas from './GraficaDeudas/GraficaDeudas';
import GraficaPresupuesto from './GraficaPresupuesto/GraficaPresupuesto';


export default function Monitoreo() {
    return (
        <>
            <GraficaGastos/>
            <GraficaIngresos/>
            <GraficaAhorros/>
            <GraficaDeudas/>
            <GraficaPresupuesto/>


        </>
    );
}

