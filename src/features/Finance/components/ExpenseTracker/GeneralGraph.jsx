// src/features/Finance/components/ExpenseTracker/GeneralGraph.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../../../../shared/utils/formatters';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label if percentage is significant enough (> 5%)
  if (percent < 0.05) return null;

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '10px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <p style={{ 
          margin: 0, 
          color: payload[0].payload.color,
          fontWeight: 'bold' 
        }}>
          {payload[0].name}
        </p>
        <p style={{ margin: '5px 0 0' }}>
          <span style={{ fontWeight: 'bold' }}>
            {formatCurrency(payload[0].value)}
          </span>
          <span style={{ marginLeft: '5px', fontSize: '12px', color: '#666' }}>
            ({payload[0].payload.percentage})
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const GeneralGraph = ({ data, totalAmount }) => {
  // If no data or empty data, return a message
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        color: '#6b7280',
        flexDirection: 'column'
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p style={{ marginTop: '1rem' }}>No hay datos para mostrar</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            formatter={(value, entry, index) => {
              return (
                <span style={{ color: entry.color, fontWeight: 500 }}>
                  {value} ({entry.payload.percentage})
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ 
        textAlign: 'center', 
        marginTop: '1rem',
        fontWeight: 'bold',
        fontSize: '1.25rem'
      }}>
        Total: {formatCurrency(totalAmount)}
      </div>
    </div>
  );
};

export default GeneralGraph;