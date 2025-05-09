import { supabase } from '../config/supabase';

// Función para obtener transacciones del usuario
export const getUserTransactions = async (userId) => {
  console.log('Obteniendo transacciones para usuario:', userId);
  
  if (!userId) {
    console.log('No hay ID de usuario, usando localStorage');
    return getTransactionsFromLocalStorage();
  }
  
  try {
    // Intentar obtener de Supabase
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error al obtener transacciones de Supabase:', error);
      // Fallback a localStorage
      return getTransactionsFromLocalStorage();
    }
    
    console.log('Transacciones obtenidas de Supabase:', data);
    return data || [];
  } catch (error) {
    console.error('Error en getUserTransactions:', error);
    // Fallback a localStorage
    return getTransactionsFromLocalStorage();
  }
};

// Función para obtener balance del usuario
export const getUserBalance = async (userId) => {
  try {
    const transactions = await getUserTransactions(userId);
    
    // Calcular balance
    const balance = transactions.reduce(
      (acc, transaction) => {
        const amount = parseFloat(transaction.amount);
        if (amount > 0) {
          acc.income += amount;
        } else {
          acc.expenses += Math.abs(amount);
        }
        acc.total += amount;
        return acc;
      },
      { total: 0, income: 0, expenses: 0 }
    );
    
    return balance;
  } catch (error) {
    console.error('Error al calcular balance:', error);
    return { total: 0, income: 0, expenses: 0 };
  }
};

// Función para agregar una transacción
export const addTransaction = async (transactionData) => {
  console.log('Datos de transacción recibidos:', transactionData);
  
  // Verificar que todos los campos requeridos estén presentes
  const requiredFields = ['description', 'amount', 'category', 'date', 'type'];
  for (const field of requiredFields) {
    if (!transactionData[field] && transactionData[field] !== 0) {
      console.error(`Error: Campo requerido faltante: ${field}`);
      throw new Error(`Campo requerido faltante: ${field}`);
    }
  }
  
  // Asegurarse de que amount sea un número
  const amount = parseFloat(transactionData.amount);
  if (isNaN(amount)) {
    console.error('Error: El monto debe ser un número válido');
    throw new Error('El monto debe ser un número válido');
  }
  
  // Preparar datos para guardar
  const dataToSave = {
    description: transactionData.description,
    amount: amount,
    category: transactionData.category,
    date: transactionData.date,
    type: transactionData.type
  };
  
  // Si hay user_id, incluirlo
  if (transactionData.user_id) {
    dataToSave.user_id = transactionData.user_id;
  }
  
  console.log('Guardando transacción:', dataToSave);
  
  try {
    // Intentar guardar en Supabase
    const { data, error } = await supabase
      .from('transactions')
      .insert([dataToSave]);
    
    if (error) {
      console.error('Error de Supabase al guardar transacción:', error);
      // Fallback a localStorage
      return saveTransactionToLocalStorage(dataToSave);
    }
    
    console.log('Transacción guardada exitosamente en Supabase:', data);
    return data[0] || dataToSave;
  } catch (error) {
    console.error('Error en addTransaction:', error);
    // Fallback a localStorage
    return saveTransactionToLocalStorage(dataToSave);
  }
};

// Funciones auxiliares para localStorage (fallback)
const getTransactionsFromLocalStorage = () => {
  try {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    console.log('Transacciones obtenidas de localStorage:', transactions);
    return transactions;
  } catch (error) {
    console.error('Error al obtener transacciones de localStorage:', error);
    return [];
  }
};

const saveTransactionToLocalStorage = (transactionData) => {
  try {
    // Obtener transacciones existentes
    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    // Crear nueva transacción con ID generado
    const newTransaction = {
      ...transactionData,
      id: Date.now().toString(), // ID único basado en timestamp
      created_at: new Date().toISOString()
    };
    
    // Agregar a la lista y guardar
    existingTransactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(existingTransactions));
    
    console.log('Transacción guardada en localStorage:', newTransaction);
    return newTransaction;
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
    throw error;
  }
};

// Función para obtener transacciones agrupadas por mes (para gráficos)
export const getMonthlyTransactions = async (userId, months = 6) => {
  try {
    const transactions = await getUserTransactions(userId);
    
    // Obtener fecha actual y fecha hace X meses
    const today = new Date();
    const startDate = new Date();
    startDate.setMonth(today.getMonth() - months + 1);
    startDate.setDate(1);
    
    // Crear array con los últimos X meses
    const monthsArray = [];
    for (let i = 0; i < months; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      monthsArray.unshift({ 
        month: monthName, 
        year: year,
        income: 0,
        expenses: 0
      });
    }
    
    // Agrupar transacciones por mes
    transactions.forEach(transaction => {
      const transDate = new Date(transaction.date);
      const transMonth = transDate.toLocaleString('default', { month: 'short' });
      const transYear = transDate.getFullYear();
      
      const monthData = monthsArray.find(m => m.month === transMonth && m.year === transYear);
      if (monthData) {
        const amount = parseFloat(transaction.amount);
        if (amount > 0) {
          monthData.income += amount;
        } else {
          monthData.expenses += Math.abs(amount);
        }
      }
    });
    
    return monthsArray;
  } catch (error) {
    console.error('Error al obtener transacciones mensuales:', error);
    return [];
  }
};