// src/components/Monitoreo/dataset/incomeData.js
export const dataset = [
    {
      Salario: 3000,
      Inversiones: 500,
      Freelance: 700,
      Otros: 300,
      month: 'En',
    },
    {
      Salario: 3100,
      Inversiones: 600,
      Freelance: 800,
      Otros: 250,
      month: 'Feb',
    },
    {
      Salario: 3200,
      Inversiones: 700,
      Freelance: 600,
      Otros: 400,
      month: 'Mar',
    },
    {
      Salario: 3300,
      Inversiones: 800,
      Freelance: 900,
      Otros: 350,
      month: 'Ab',
    },
    {
      Salario: 3400,
      Inversiones: 750,
      Freelance: 1100,
      Otros: 300,
      month: 'May',
    },
    {
      Salario: 3500,
      Inversiones: 900,
      Freelance: 1200,
      Otros: 450,
      month: 'Jun',
    },
    {
      Salario: 3600,
      Inversiones: 950,
      Freelance: 1000,
      Otros: 400,
      month: 'Jul',
    },
    {
      Salario: 3700,
      Inversiones: 1000,
      Freelance: 1100,
      Otros: 300,
      month: 'Ago',
    },
    {
      Salario: 3800,
      Inversiones: 1100,
      Freelance: 1200,
      Otros: 350,
      month: 'Sep',
    },
    {
      Salario: 3900,
      Inversiones: 1200,
      Freelance: 1300,
      Otros: 400,
      month: 'Oct',
    },
    {
      Salario: 4000,
      Inversiones: 1300,
      Freelance: 1400,
      Otros: 450,
      month: 'Nov',
    },
    {
      Salario: 4100,
      Inversiones: 1400,
      Freelance: 1500,
      Otros: 500,
      month: 'Dic',
    },
];

export function valueFormatter(value) {
    return `$ ${value}`; // Formatear como dólares, por ejemplo.
}
