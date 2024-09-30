import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BudgetPieChart() {
    const budgetData = [
        { id: 0, value: 300, label: 'Alimentos' },
        { id: 1, value: 150, label: 'Transporte' },
        { id: 2, value: 200, label: 'Entretenimiento' },
        { id: 3, value: 100, label: 'Salud' },
        { id: 4, value: 250, label: 'Ahorros' },
        { id: 5, value: 100, label: 'Otros' },
    ];

    return (
        <div>
            <h2 style={{ color: '#0F2532', width: '500px', textAlign: 'center' }}>Distribución de Presupuesto</h2> {/* Aquí puedes cambiar el color según tu tema */}

            <PieChart
                series={[{
                    data: budgetData,
                    innerRadius: 10,
                    outerRadius: 113,
                    paddingAngle: 1,
                    cornerRadius: 12,
                    startAngle: -272,
                    endAngle: 272,
                    cx: 150,
                    cy: 150,
                }]}
                width={500}
                height={500}
            />
        </div>
    );
}
