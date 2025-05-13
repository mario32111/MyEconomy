// src/features/IA/ChatIA/services/aiService.js

// Eliminamos la dependencia de OpenAI y usamos solo respuestas locales
import { getLocalUserData } from '../../../../shared/services/userDataService';

// Función para obtener datos financieros locales del usuario
const getUserFinancialContext = async (userId) => {
  try {
    const userData = await getLocalUserData(userId);
    
    // Formatea los datos para el contexto
    return {
      transactions: userData.transactions || [],
      accounts: userData.accounts || [],
      categories: userData.categories || [],
      goals: userData.goals || [],
      budgets: userData.budgets || []
    };
  } catch (error) {
    console.error("Error al obtener datos locales:", error);
    return {};
  }
};

// Función para generar el proceso de razonamiento
const generateThinkingProcess = (userQuery, userContext) => {
  let thinking = "Analizando la pregunta...\n\n";
  
  // Analiza la pregunta
  thinking += `Pregunta: "${userQuery}"\n\n`;
  
  // Examina el contexto relevante
  if (userQuery.includes("gasto") || userQuery.includes("gastos")) {
    thinking += "Revisando datos de transacciones y categorías de gastos...\n";
    if (userContext.transactions?.length > 0) {
      thinking += `Encontré ${userContext.transactions.length} transacciones para analizar.\n`;
    } else {
      thinking += "No hay transacciones registradas aún.\n";
    }
  }
  
  if (userQuery.includes("ahorro") || userQuery.includes("ahorros") || userQuery.includes("meta")) {
    thinking += "Analizando metas de ahorro y progreso actual...\n";
    if (userContext.goals?.length > 0) {
      thinking += `El usuario tiene ${userContext.goals.length} metas financieras establecidas.\n`;
    } else {
      thinking += "No hay metas financieras establecidas aún.\n";
    }
  }
  
  if (userQuery.includes("presupuesto")) {
    thinking += "Revisando presupuestos y cumplimiento...\n";
    if (userContext.budgets?.length > 0) {
      thinking += `Hay ${userContext.budgets.length} presupuestos configurados.\n`;
    } else {
      thinking += "No hay presupuestos configurados aún.\n";
    }
  }
  
  thinking += "\nFormulando respuesta basada en el análisis...";
  
  return thinking;
};

// Función para enviar mensaje al modelo de IA (simulada localmente)
const sendMessageToAI = async (messages, userId) => {
  try {
    const userContext = await getUserFinancialContext(userId);
    const userQuery = messages[messages.length - 1].content.toLowerCase();
    
    // Simular un tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generar respuesta local
    return generateLocalResponse(userQuery, userContext);
  } catch (error) {
    console.error("Error general:", error);
    return "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.";
  }
};

// Función para generar respuestas locales basadas en palabras clave
const generateLocalResponse = (userQuery, userContext) => {
  // Respuestas predefinidas basadas en palabras clave
  if (userQuery.includes("gasto") || userQuery.includes("gastos")) {
    if (userContext.transactions?.length > 0) {
      const totalGastos = userContext.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
      
      return `Basado en tus datos, has gastado un total de $${totalGastos.toFixed(2)}. 
      
Las principales categorías de gasto son:
${getCategoriesBreakdown(userContext.transactions, userContext.categories)}

Para reducir tus gastos, considera revisar las categorías con mayor porcentaje y buscar alternativas más económicas.`;
    } else {
      return "No tienes transacciones registradas aún. Para comenzar a hacer un seguimiento de tus gastos, agrega tus transacciones en la sección de Seguimiento de Gastos.";
    }
  }
  
  if (userQuery.includes("ahorro") || userQuery.includes("ahorros")) {
    if (userContext.transactions?.length > 0) {
      const ingresos = userContext.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
      
      const gastos = userContext.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
      
      const ahorro = ingresos - gastos;
      const porcentajeAhorro = ingresos > 0 ? (ahorro / ingresos) * 100 : 0;
      
      return `Tu tasa de ahorro actual es del ${porcentajeAhorro.toFixed(2)}% de tus ingresos.
      
Has ahorrado $${ahorro.toFixed(2)} de un total de $${ingresos.toFixed(2)} de ingresos.

Una buena meta es ahorrar al menos el 20% de tus ingresos. Considera establecer transferencias automáticas a una cuenta de ahorro cada vez que recibas ingresos.`;
    } else {
      return "No tienes datos suficientes para calcular tu tasa de ahorro. Comienza registrando tus ingresos y gastos para obtener recomendaciones personalizadas.";
    }
  }
  
  if (userQuery.includes("presupuesto")) {
    if (userContext.budgets?.length > 0) {
      return `Tienes ${userContext.budgets.length} presupuestos configurados. 
      
Para mejorar tu gestión financiera, asegúrate de revisar regularmente tu progreso y ajustar tus presupuestos según sea necesario.`;
    } else {
      return "No tienes presupuestos configurados aún. Crear un presupuesto es el primer paso para tomar control de tus finanzas. Comienza asignando límites a tus principales categorías de gasto.";
    }
  }
  
  if (userQuery.includes("meta") || userQuery.includes("metas")) {
    if (userContext.goals?.length > 0) {
      return `Tienes ${userContext.goals.length} metas financieras establecidas. 
      
Recuerda que las metas SMART (Específicas, Medibles, Alcanzables, Relevantes y con Tiempo definido) tienen más probabilidades de éxito.`;
    } else {
      return "No tienes metas financieras establecidas aún. Establecer metas claras te ayudará a mantener el enfoque y la motivación en tu camino hacia la estabilidad financiera.";
    }
  }
  
  if (userQuery.includes("invertir") || userQuery.includes("inversión") || userQuery.includes("inversiones")) {
    return `La inversión es una excelente manera de hacer crecer tu dinero a largo plazo. Aquí hay algunos consejos básicos:

1. Comienza con un fondo de emergencia antes de invertir
2. Diversifica tus inversiones para reducir el riesgo
3. Considera invertir en fondos indexados si eres principiante
4. Reinvierte los dividendos para aprovechar el interés compuesto
5. Invierte regularmente, independientemente de las condiciones del mercado

Recuerda que toda inversión conlleva riesgos y es importante educarte antes de comenzar.`;
  }
  
  if (userQuery.includes("deuda") || userQuery.includes("deudas") || userQuery.includes("préstamo") || userQuery.includes("crédito")) {
    return `Gestionar tus deudas es fundamental para tu salud financiera. Aquí hay algunas estrategias:

1. Prioriza las deudas con tasas de interés más altas
2. Considera la consolidación de deudas si tienes múltiples préstamos
3. Haz más que el pago mínimo siempre que sea posible
4. Negocia con tus acreedores para obtener mejores condiciones
5. Evita acumular nuevas deudas mientras pagas las existentes

Recuerda que salir de deudas es un maratón, no un sprint. La consistencia es clave.`;
  }
  
  if (userQuery.includes("consejo") || userQuery.includes("consejos") || userQuery.includes("recomendación") || userQuery.includes("recomendaciones")) {
    return `Aquí tienes algunos consejos financieros generales:

1. Crea y sigue un presupuesto mensual
2. Establece un fondo de emergencia que cubra 3-6 meses de gastos
3. Automatiza tus ahorros e inversiones
4. Revisa regularmente tus suscripciones y gastos recurrentes
5. Edúcate continuamente sobre finanzas personales
6. Vive por debajo de tus posibilidades
7. Planifica para grandes gastos futuros
8. Protege tu patrimonio con seguros adecuados

¿Hay algún área específica sobre la que te gustaría más consejos?`;
  }
  
  // Respuesta genérica si no coincide con ninguna palabra clave
  return `Gracias por tu pregunta sobre "${userQuery}". 

Para ayudarte mejor, necesito más información sobre tus finanzas. Puedes preguntarme sobre:

- Tus gastos y cómo reducirlos
- Estrategias de ahorro
- Creación y gestión de presupuestos
- Establecimiento de metas financieras
- Inversiones básicas
- Gestión de deudas
- Consejos financieros generales

¿Sobre cuál de estos temas te gustaría saber más?`;
};

// Función auxiliar para obtener el desglose de categorías
const getCategoriesBreakdown = (transactions, categories) => {
  if (!transactions || transactions.length === 0) return "No hay datos disponibles";
  
  // Crear un mapa de categorías por ID
  const categoryMap = {};
  if (categories && categories.length > 0) {
    categories.forEach(cat => {
      categoryMap[cat.id] = cat.name;
    });
  }
  
  // Calcular gastos por categoría
  const expensesByCategory = {};
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => {
      const amount = parseFloat(t.amount) || 0;
      const categoryId = t.category_id;
      const categoryName = categoryMap[categoryId] || 'Sin categoría';
      
      expensesByCategory[categoryName] = (expensesByCategory[categoryName] || 0) + amount;
      return sum + amount;
    }, 0);
  
  // Formatear el resultado
  let result = "";
  Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1]) // Ordenar de mayor a menor
    .slice(0, 3) // Tomar las 3 principales
    .forEach(([category, amount]) => {
      const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
      result += `- ${category}: $${amount.toFixed(2)} (${percentage.toFixed(1)}%)\n`;
    });
  
  return result || "No hay datos de categorías disponibles";
};

export { sendMessageToAI, generateThinkingProcess, getUserFinancialContext };