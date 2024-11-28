import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';

const ExpenseChart = () => {
    const allData = [
        { category: 'Alimentos', amount: 300, date: '2024-09-01' },
        { category: 'Transporte', amount: 150, date: '2024-09-05' },
        { category: 'Entretenimiento', amount: 100, date: '2024-09-10' },
        { category: 'Entrenamiento', amount: 200, date: '2024-09-15' },
        { category: 'Salud', amount: 120, date: '2024-09-20' },
        { category: 'Otros', amount: 50, date: '2024-09-25' },
    ];

    const [amountThreshold, setAmountThreshold] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredData = allData.filter((item) => {
        const date = new Date(item.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const withinAmountRange = item.amount >= amountThreshold;
        const withinDateRange = (!start || date >= start) && (!end || date <= end);

        return withinAmountRange && withinDateRange;
    });

    const chartData = filteredData.map((item, index) => ({
        id: index,
        value: item.amount,
        label: item.category,
    }));

    const totalExpense = filteredData.reduce((sum, item) => sum + item.amount, 0);

    return (
        <Box style={{ width: '280px', margin: '0 auto', position: 'relative' }}>
            <h2 style={{ color: '#0F2532', width: '100%', textAlign: 'center', margin: '0 auto' }}>Distribución de Gastos</h2>

            <TextField
                type="number"
                label="Gastos Mínimos"
                value={amountThreshold}
                onChange={(e) => setAmountThreshold(Number(e.target.value))}
                inputProps={{ min: 0 }}
                variant="outlined"
                margin="normal"
                style={{ width: '120px' }}
            />

            <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
                <TextField
                    type="date"
                    label="Fecha de Inicio"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="date"
                    label="Fecha de Fin"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>

            <Box style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart
                    series={[{
                        data: chartData,
                        innerRadius: 70,
                        outerRadius: 113,
                        paddingAngle: 1,
                        cornerRadius: 12,
                        startAngle: -272,
                        endAngle: 272,
                        cx: 150,
                        cy: 150,
                    }]}
                    width={280}
                    height={750}
                />
                
                <Typography
                    variant="h6"
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '55%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: '#0F2532',
                    }}
                >
                    Total: ${totalExpense}
                </Typography>
            </Box>
        </Box>
    );
};

export default ExpenseChart;
