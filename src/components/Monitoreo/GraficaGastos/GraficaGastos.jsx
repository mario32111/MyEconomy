import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const ExpenseChart = () => {
    const data = [
        { category: 'Alimentos', amount: 300 },
        { category: 'Transporte', amount: 150 },
        { category: 'Entretenimiento', amount: 100 },
        { category: 'Entrenamiento', amount: 200 },
        { category: 'Salud', amount: 120 },
        { category: 'Otros', amount: 50 },
    ];

    // Formatear los datos para el gráfico
    const chartData = data.map((item, index) => ({
        id: index, // O puedes usar un identificador único
        value: item.amount,
        label: item.category,
    }));

    return (
        <div>
            <h2 style={{ color: '#0F2532', width: '500px', textAlign: 'center'}}>Distribución de Gastos</h2> {/* Aquí puedes cambiar el color según tu tema */}
            <PieChart
                series={[
                    {
                        data: chartData,
                        innerRadius: 10,
                        outerRadius: 113,
                        paddingAngle: 1,
                        cornerRadius: 12,
                        startAngle: -272,
                        endAngle: 272,
                        cx: 150,
                        cy: 150,
                    },
                ]}
                width={500}
                height={500}
            />
        </div>
    );
};

export default ExpenseChart;
