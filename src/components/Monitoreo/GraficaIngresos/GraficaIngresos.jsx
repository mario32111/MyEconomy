import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset, valueFormatter } from '../GraficaIngresos/weather';

const chartSetting = {
    yAxis: [
        {
            label: 'ingresos',
        },
    ],
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};

export default function BarsDataset() {
    return (
        <div>
            <h2 style={{ color: '#0F2532', width: '500px', textAlign: 'center' }}>Distribución de Ingresos</h2> {/* Aquí puedes cambiar el color según tu tema */}

            <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[
                    { dataKey: 'Salario', label: 'Salario', valueFormatter },
                    { dataKey: 'Inversiones', label: 'Inversiones', valueFormatter },
                    { dataKey: 'Freelance', label: 'Freelance', valueFormatter },
                    { dataKey: 'Otros', label: 'Otros', valueFormatter },
                ]}
                {...chartSetting}
            />
        </div>

    );
}

