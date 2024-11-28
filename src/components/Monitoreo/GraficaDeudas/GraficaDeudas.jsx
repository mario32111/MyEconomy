import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const DebtChart = () => {
    const debtData = [
        { category: 'Tarjetas de Crédito', amount: 1200 },
        { category: 'Préstamos', amount: 800 },
        { category: 'Hipoteca', amount: 1500 },
        { category: 'Deudas Médicas', amount: 400 },
        { category: 'Otros', amount: 600 },
    ];

    // Formatear los datos para el gráfico
    const dataset = debtData.map((item, index) => ({
        id: index, // O puedes usar un identificador único
        category: item.category,
        amount: item.amount,
    }));

    const chartSetting = {
        yAxis: [
            {
                label: 'Deuda ($)',
            },
        ],
        xAxis: [
            {
                scaleType: 'band',
                data: debtData.map(item => item.category), // Usar las categorías como datos
                categoryGapRatio: 0.3,
                barGapRatio: 0.1,
            },
        ],
        width: 300,
        height: 300,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };

    return (
        <div style={{width: '280px', margin: '0 auto'}}>
            <h2 style={{ color: '#0F2532', width: '100%', textAlign: 'center' }}>Deudas por causa</h2> {/* Aquí puedes cambiar el color según tu tema */}
            <BarChart
                dataset={dataset} // Asegúrate de incluir el dataset aquí
                series={[
                    { 
                        dataKey: 'amount', // Utiliza la clave de datos correcta para la serie
                        label: 'Deuda',
                    },
                ]}
                {...chartSetting}
            />
        </div>
    );
};

export default DebtChart;
