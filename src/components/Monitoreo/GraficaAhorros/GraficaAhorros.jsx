import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const SavingsChart = () => {
    const savingsData = [
        { month: 'Ene', savings: 300 },
        { month: 'Feb', savings: 500 },
        { month: 'Mar', savings: 700 },
        { month: 'Abr', savings: 400 },
        { month: 'May', savings: 800 },
        { month: 'Jun', savings: 600 },
        { month: 'Jul', savings: 900 },
        { month: 'Ago', savings: 1000 },
        { month: 'Sep', savings: 1200 },
        { month: 'Oct', savings: 1300 },
        { month: 'Nov', savings: 1400 },
        { month: 'Dic', savings: 1600 },
    ];

    // Dataset debe incluir todas las entradas del gráfico
    const dataset = savingsData.map((item, index) => ({
        id: index,
        month: item.month,
        savings: item.savings,
    }));

    const chartSetting = {
        width: 600,
        height: 400,
        xAxis: [{ scaleType: 'band', dataKey: 'month' }],
        yAxis: [
            {
                label: 'Ahorros ($)',
            },
        ],
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };

    return (
        <div>
            <h2 style={{ color: '#0F2532', width: '500px', textAlign: 'center' }}>Distribución de Ahorros</h2> {/* Aquí puedes cambiar el color según tu tema */}
            <LineChart
                dataset={dataset} // Asegúrate de incluir el dataset aquí
                series={[
                    { 
                        curve: 'linear', 
                        dataKey: 'savings' // Utiliza la clave de datos correcta para la serie
                    },
                ]}
                {...chartSetting}
            />
        </div>
    );
};

export default SavingsChart;
