import React from 'react';
import Calculadora from './Calculadora/Calculadora'
import PlanificadorDeAhorros from './PlanificadorDeAhorros/PlanificadorDeAhorros'
import RecordatoriosSeguimiento from './RecordatoriosSeguimiento/RecordatoriosSeguimiento'

export default function MetasFinancieras() {
    return (
        <>
            <Calculadora />
            <PlanificadorDeAhorros />
            <RecordatoriosSeguimiento />
        </>
    );
}
