// src/features/Education/data/treesData.js
export const treesData = {
  categories: [
    {
      id: 'basic',
      name: 'Básicos',
      trees: [
        {
          id: 'oak',
          name: 'Roble',
          description: 'Un árbol fuerte y resistente, perfecto para cursos de finanzas básicas',
          stages: [
            { level: 1, name: 'Semilla', imageUrl: '/assets/img/trees/oak_1.png', minProgress: 0 },
            { level: 2, name: 'Brote', imageUrl: '/assets/img/trees/oak_2.png', minProgress: 25 },
            { level: 3, name: 'Arbolito', imageUrl: '/assets/img/trees/oak_3.png', minProgress: 50 },
            { level: 4, name: 'Árbol joven', imageUrl: '/assets/img/trees/oak_4.png', minProgress: 75 },
            { level: 5, name: 'Árbol maduro', imageUrl: '/assets/img/trees/oak_5.png', minProgress: 100 }
          ]
        },
        {
          id: 'pine',
          name: 'Pino',
          description: 'Crece rápido y constante, ideal para cursos de inversión',
          stages: [
            { level: 1, name: 'Semilla', imageUrl: '/assets/img/trees/pine_1.png', minProgress: 0 },
            { level: 2, name: 'Brote', imageUrl: '/assets/img/trees/pine_2.png', minProgress: 25 },
            { level: 3, name: 'Arbolito', imageUrl: '/assets/img/trees/pine_3.png', minProgress: 50 },
            { level: 4, name: 'Árbol joven', imageUrl: '/assets/img/trees/pine_4.png', minProgress: 75 },
            { level: 5, name: 'Árbol maduro', imageUrl: '/assets/img/trees/pine_5.png', minProgress: 100 }
          ]
        }
      ]
    },
    {
      id: 'advanced',
      name: 'Avanzados',
      trees: [
        {
          id: 'maple',
          name: 'Arce',
          description: 'Colorido y llamativo, perfecto para cursos de presupuesto',
          stages: [
            { level: 1, name: 'Semilla', imageUrl: '/assets/img/trees/maple_1.png', minProgress: 0 },
            { level: 2, name: 'Brote', imageUrl: '/assets/img/trees/maple_2.png', minProgress: 25 },
            { level: 3, name: 'Arbolito', imageUrl: '/assets/img/trees/maple_3.png', minProgress: 50 },
            { level: 4, name: 'Árbol joven', imageUrl: '/assets/img/trees/maple_4.png', minProgress: 75 },
            { level: 5, name: 'Árbol maduro', imageUrl: '/assets/img/trees/maple_5.png', minProgress: 100 }
          ]
        },
        {
          id: 'cherry',
          name: 'Cerezo',
          description: 'Hermoso y delicado, ideal para cursos de ahorro',
          stages: [
            { level: 1, name: 'Semilla', imageUrl: '/assets/img/trees/cherry_1.png', minProgress: 0 },
            { level: 2, name: 'Brote', imageUrl: '/assets/img/trees/cherry_2.png', minProgress: 25 },
            { level: 3, name: 'Arbolito', imageUrl: '/assets/img/trees/cherry_3.png', minProgress: 50 },
            { level: 4, name: 'Árbol joven', imageUrl: '/assets/img/trees/cherry_4.png', minProgress: 75 },
            { level: 5, name: 'Árbol maduro', imageUrl: '/assets/img/trees/cherry_5.png', minProgress: 100 }
          ]
        }
      ]
    }
  ]
};

// Función para obtener la etapa actual de un árbol según el progreso
export const getCurrentStage = (tree, progress) => {
  if (!tree || !tree.stages || tree.stages.length === 0) {
    return null;
  }

  // Ordenar las etapas por progreso mínimo (de mayor a menor)
  const sortedStages = [...tree.stages].sort((a, b) => b.minProgress - a.minProgress);
  
  // Encontrar la primera etapa cuyo progreso mínimo sea menor o igual al progreso actual
  return sortedStages.find(stage => stage.minProgress <= progress) || tree.stages[0];
};

export default treesData;