// src/features/Finance/components/ExpenseTracker/GeneralGraph.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const GeneralGraph = ({ data, totalAmount }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#6b7280',
        flexDirection: 'column'
      }}>
        <p>No hay datos para mostrar</p>
      </div>
    );
  }

  // Ordenar los datos por valor (de mayor a menor)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: data.color }}>
            {data.name}
          </p>
          <p style={{ margin: '5px 0 0' }}>
            ${data.value.toFixed(2)} ({data.percentage})
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '8px'
      }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: '5px',
            backgroundColor: '#f3f4f6',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: entry.color,
              marginRight: '5px',
              borderRadius: '50%'
            }} />
            <span>{entry.value} ({entry.payload.percentage})</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sortedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Total en el centro */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>Total</div>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 'bold',
          color: '#1f2937'
        }}>
          ${totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default GeneralGraph;