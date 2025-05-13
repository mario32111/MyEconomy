// Utilidades para mejorar los prompts enviados a la IA

// Formatea los datos financieros para incluirlos en el prompt
export const formatFinancialData = (data, maxItems = 5) => {
    if (!data || data.length === 0) return "No hay datos disponibles";
    
    // Limitar la cantidad de datos para no sobrecargar el prompt
    const limitedData = data.slice(0, maxItems);
    
    return limitedData.map((item, index) => {
      return `${index + 1}. ${JSON.stringify(item)}`;
    }).join('\n');
  };
  
  // Genera un resumen de los datos financieros
  export const generateFinancialSummary = (userData) => {
    let summary = "";
    
    if (userData.transactions?.length > 0) {
      const totalIncome = userData.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
        
      const totalExpenses = userData.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
        
      summary += `Ingresos totales: $${totalIncome.toFixed(2)}\n`;
      summary += `Gastos totales: $${totalExpenses.toFixed(2)}\n`;
      summary += `Balance: $${(totalIncome - totalExpenses).toFixed(2)}\n\n`;
    }
    
    if (userData.categories?.length > 0) {
      summary += `Categorías principales: ${userData.categories.slice(0, 3).map(c => c.name).join(', ')}\n\n`;
    }
    
    if (userData.goals?.length > 0) {
      summary += `Metas financieras: ${userData.goals.length}\n\n`;
    }
    
    return summary;
  };
  
  // Genera preguntas de seguimiento basadas en el contexto
  export const generateFollowUpQuestions = (userQuery, userData) => {
    const questions = [];
    
    if (userQuery.includes('gasto') || userQuery.includes('gastos')) {
      questions.push("¿Quieres ver un desglose por categorías?");
      questions.push("¿Te gustaría comparar con meses anteriores?");
    }
    
    if (userQuery.includes('ahorro') || userQuery.includes('meta')) {
      questions.push("¿Quieres un plan para alcanzar tu meta más rápido?");
      questions.push("¿Necesitas ajustar tus metas actuales?");
    }
    
    if (userQuery.includes('presupuesto')) {
      questions.push("¿Quieres sugerencias para ajustar tu presupuesto?");
      questions.push("¿Te gustaría crear un nuevo presupuesto?");
    }
    
    return questions.slice(0, 2); // Devolver máximo 2 preguntas
  };