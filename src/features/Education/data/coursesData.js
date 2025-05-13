// src/features/Education/data/coursesData.js
const coursesData = [
{
  id: 'basics-101',
  title: 'Fundamentos de Finanzas Personales',
  description: 'Aprende los conceptos básicos para administrar tu dinero de manera efectiva y construir una base financiera sólida.',
  category: 'basics',
  level: 'beginner',
  duration: '2-3 horas',
  image: 'https://media.licdn.com/dms/image/v2/D4E12AQGJ4l6mGAShCA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1713292891123?e=2147483647&v=beta&t=wNZZ9t3kWrVXYMLQM2LMbZ6cjN8TZO5H98WnZpI1cnM',
  rating: 4.8,
  reviews: 124,
  instructor: 'María Rodríguez',
  lessons: [  // Añade estas lecciones
    {
      id: 'basics-101-l1',
      title: 'Introducción a las Finanzas Personales',
      content: 'Aprende qué son las finanzas personales y por qué son importantes para tu bienestar financiero.',
      duration: '15 min',
      type: 'text'
    },
    {
      id: 'basics-101-l2',
      title: 'Ingresos y Gastos',
      content: 'Aprende a identificar y categorizar tus ingresos y gastos para tener una mejor visión de tu situación financiera.',
      duration: '20 min',
      type: 'text'
    },
    {
      id: 'basics-101-l3',
      title: 'Creando un Presupuesto',
      content: 'Aprende a crear un presupuesto efectivo que te ayude a controlar tus gastos y alcanzar tus metas financieras.',
      duration: '25 min',
      type: 'text',
      challenge: {
        id: 'basics-101-c1',
        title: 'Crea tu Primer Presupuesto',
        description: 'Aplica lo aprendido creando un presupuesto personal básico',
        steps: [
          {
            type: 'text-input',
            shortTitle: 'Ingresos',
            title: 'Identifica tus ingresos mensuales',
            description: 'Escribe la cantidad total de dinero que recibes mensualmente de todas tus fuentes de ingresos.',
            placeholder: 'Ej: 15000',
            hint: 'Suma todos tus ingresos: salario, trabajos adicionales, rentas, etc.',
            validateAnswer: (answer) => answer && !isNaN(answer) && parseFloat(answer) > 0,
            successMessage: 'Excelente, has identificado tus ingresos mensuales.',
            errorMessage: 'Asegúrate de ingresar un número válido mayor que cero.'
          },
          {
            type: 'multiple-choice',
            shortTitle: 'Gastos',
            title: 'Categorías de gastos esenciales',
            description: '¿Cuál de las siguientes NO es considerada una categoría de gasto esencial?',
            options: [
              'Vivienda (renta o hipoteca)',
              'Alimentación',
              'Servicios básicos (luz, agua, gas)',
              'Suscripciones de entretenimiento'
            ],
            correctAnswer: 'Suscripciones de entretenimiento',
            hint: 'Los gastos esenciales son aquellos necesarios para cubrir necesidades básicas.',
            successMessage: '¡Correcto! Las suscripciones de entretenimiento son gastos discrecionales, no esenciales.',
            errorMessage: 'Incorrecto. Los gastos esenciales son aquellos necesarios para vivir, como vivienda, alimentación y servicios básicos.'
          }
        ],
        points: 50
      }
    },
    {
      id: 'basics-101-l4',
      title: 'Ahorro e Inversión Básica',
      content: 'Descubre la importancia del ahorro y cómo comenzar a invertir de manera segura.',
      duration: '20 min',
      type: 'text',
      quiz: {
        questions: [
          {
            question: '¿Cuál es la regla general recomendada para el ahorro de emergencia?',
            options: [
              'Ahorrar el 5% de cada ingreso',
              'Tener ahorrado el equivalente a 3-6 meses de gastos',
              'Ahorrar $1000 pesos',
              'Invertir todo el dinero extra'
            ],
            correctAnswer: 'Tener ahorrado el equivalente a 3-6 meses de gastos'
          },
          {
            question: '¿Qué tipo de inversión suele tener menor riesgo?',
            options: [
              'Acciones de empresas nuevas',
              'Criptomonedas',
              'Bonos gubernamentales',
              'Préstamos personales'
            ],
            correctAnswer: 'Bonos gubernamentales'
          }
        ]
      }
    },
    {
      id: 'basics-101-l5',
      title: 'Manejo de Deudas',
      content: 'Aprende estrategias para manejar y reducir tus deudas de manera efectiva.',
      duration: '20 min',
      type: 'text'
    }
  ]
},
  {
    id: 'saving-301',
    title: 'Estrategias de Ahorro',
    description: 'Descubre técnicas efectivas para aumentar tus ahorros sin sacrificar tu calidad de vida.',
    category: 'saving',
    level: 'beginner',
    duration: '2-3 horas',
    image: 'https://iedra.uned.es/asset-v1:UNED+Competencias_FinanzasPersonales_001+2025+type@asset+block@Competenciasbasicassobrefinanzaspersonales.jpg',
    rating: 4.7,
    reviews: 112,
    instructor: 'Ana Gómez',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Fundamentos del Ahorro',
        content: 'Aprende por qué el ahorro es crucial para tu salud financiera y cómo comenzar.',
        duration: '20 min',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=1tpC2FcD0rE'
      },
      {
        id: 'lesson-2',
        title: 'Ahorro Automático',
        content: 'Descubre cómo configurar sistemas de ahorro automático para no tener que pensar en ello.',
        duration: '25 min',
        type: 'text'
      }
    ]
  },
  {
    id: 'investing-401',
    title: 'Inversión para Principiantes',
    description: 'Aprende los conceptos básicos de inversión y cómo comenzar a hacer crecer tu dinero.',
    category: 'investing',
    level: 'beginner',
    duration: '4-5 horas',
    image: 'https://cdn.prod.website-files.com/61dd4cf2cbf406baba76f59b/61dd4cf2cbf4064ebf76f7fe_b%20es%204.jpeg',
    rating: 4.9,
    reviews: 156,
    instructor: 'Roberto Sánchez',
    lessons: [
      {
        id: 'lesson-1',
        title: '¿Qué es la Inversión?',
        content: 'Comprende los conceptos básicos de inversión y por qué es importante para tu futuro financiero.',
        duration: '20 min',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=oFCz7lxE_SE'
      },
      {
        id: 'lesson-2',
        title: 'Tipos de Inversiones',
        content: 'Explora diferentes tipos de inversiones y sus niveles de riesgo y rendimiento.',
        duration: '30 min',
        type: 'text'
      }
    ]
  },
  {
    id: 'debt-501',
    title: 'Manejo Inteligente de Deudas',
    description: 'Aprende estrategias efectivas para manejar y reducir tus deudas de manera inteligente.',
    category: 'debt',
    level: 'intermediate',
    duration: '3-4 horas',
    image: 'https://capriolicontadores.com/wp-content/uploads/2024/01/finanzas-personales.png',
    rating: 4.5,
    reviews: 87,
    instructor: 'Laura Torres',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Entendiendo las Deudas',
        content: 'Aprende a diferenciar entre deudas buenas y malas, y cómo afectan tu salud financiera.',
        duration: '25 min',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=H0F1oui5w9Y'
      },
      {
        id: 'lesson-2',
        title: 'Estrategias de Pago de Deudas',
        content: 'Descubre diferentes métodos para pagar tus deudas de manera eficiente.',
        duration: '30 min',
        type: 'text'
      }
    ]
  },
  {
    id: 'credit-601',
    title: 'Construyendo un Buen Historial Crediticio',
    description: 'Aprende a construir y mantener un buen historial crediticio para mejorar tu salud financiera.',
    category: 'debt',
    level: 'beginner',
    duration: '2-3 horas',
    image: 'https://i.ytimg.com/vi/KWYsOS4w53g/hqdefault.jpg',
    rating: 4.7,
    reviews: 103,
    instructor: 'Pedro Ramírez',
    lessons: [
      {
        id: 'lesson-1',
        title: '¿Qué es el Crédito?',
        content: 'Comprende qué es el crédito y cómo funciona el sistema crediticio.',
        duration: '20 min',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=KWYsOS4w53g'
      },
      {
        id: 'lesson-2',
        title: 'Factores que Afectan tu Puntaje Crediticio',
        content: 'Descubre qué factores influyen en tu puntaje crediticio y cómo mejorarlos.',
        duration: '25 min',
        type: 'text'
      }
    ]
  },
  {
    id: 'retirement-701',
    title: 'Planificación para el Retiro',
    description: 'Aprende a planificar para tu retiro y asegurar un futuro financiero estable.',
    category: 'investing',
    level: 'advanced',
    duration: '4-5 horas',
    image: 'https://tradeacademy.center/corporate-finances/wp-content/uploads/2021/06/blogfdb6-1.jpg',
    rating: 4.8,
    reviews: 92,
    instructor: 'Sofía Martínez',
    lessons: [
      {
        id: 'lesson-1',
        title: 'La Importancia de Planificar el Retiro',
        content: 'Comprende por qué es crucial comenzar a planificar tu retiro lo antes posible.',
        duration: '20 min',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=kGuO0vm1Nfw&pp=ygUVI2FwcmVuZGVzb2JyZWZpbmFuemFz'
      },
      {
        id: 'lesson-2',
        title: 'Opciones de Ahorro para el Retiro',
        content: 'Explora diferentes opciones de ahorro e inversión específicas para el retiro.',
        duration: '30 min',
        type: 'text'
      }
    ]
  },
  {
    id: 'taxes-801',
    title: 'Entendiendo los Impuestos',
    description: 'Aprende los conceptos básicos sobre impuestos y cómo optimizar tu situación fiscal.',
    category: 'basics',
    level: 'intermediate',
    duration: '3-4 horas',
    image: 'https://img-c.udemycdn.com/course/240x135/5283908_2745.jpg',
    rating: 4.6,
    reviews: 78,
    instructor: 'Miguel Ángel López',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Fundamentos de los Impuestos',
        content: 'Comprende cómo funcionan los impuestos y por qué son importantes.',
        duration: '25 min',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=z76tHOAU9Lw'
      },
      {
        id: 'lesson-2',
        title: 'Deducciones y Créditos Fiscales',
        content: 'Aprende sobre deducciones y créditos fiscales que pueden ayudarte a reducir tu carga fiscal.',
        duration: '30 min',
        type: 'text'
      }
    ]
  }
];

export default coursesData;