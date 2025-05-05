import { useState, useEffect, useCallback } from 'react';
import { defaultCategories } from './categoryData';

export const useExpenseTrackerLogic = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Función para obtener transacciones
  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Cargar desde localStorage
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
        const allTransactions = JSON.parse(savedTransactions);

        // Filtrar por la fecha seleccionada
        const selectedDateStart = new Date(selectedDate);
        selectedDateStart.setHours(0, 0, 0, 0);

        const selectedDateEnd = new Date(selectedDate);
        selectedDateEnd.setHours(23, 59, 59, 999);

        const filteredTransactions = allTransactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= selectedDateStart && 
                 transactionDate <= selectedDateEnd;
        });

        setTransactions(filteredTransactions);
      } else {
        setTransactions([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Error al cargar las transacciones. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }
  }, [selectedDate]);

  // Calcular totales para el gráfico
  const calculateTotals = () => {
    // Configurar la fecha seleccionada
    const selectedDateStart = new Date(selectedDate);
    selectedDateStart.setHours(0, 0, 0, 0);

    const selectedDateEnd = new Date(selectedDate);
    selectedDateEnd.setHours(23, 59, 59, 999);

    // Filtrar transacciones de la fecha seleccionada (solo gastos)
    const todayTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= selectedDateStart && 
             transactionDate <= selectedDateEnd &&
             transaction.amount < 0;
    });

    // Agrupar por categoría
    const groupedByCategory = todayTransactions.reduce((acc, transaction) => {
      const category = transaction.category || 'Sin categoría';

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += Math.abs(transaction.amount);
      return acc;
    }, {});

    // Convertir a formato para el gráfico
    const chartData = Object.entries(groupedByCategory).map(([name, value]) => {
      // Buscar la categoría para obtener el color
      const categoryData = categories.find(cat => cat.name === name) || { color: '#' + Math.floor(Math.random()*16777215).toString(16) };

      return {
        name,
        value,
        color: categoryData.color,
        percentage: 0 // Se calculará a continuación
      };
    });

    // Calcular el total de gastos
    const totalExpense = chartData.reduce((sum, item) => sum + item.value, 0);

    // Calcular porcentajes
    chartData.forEach(item => {
      item.percentage = totalExpense > 0 ? ((item.value / totalExpense) * 100).toFixed(1) + '%' : '0%';
    });

    return { chartData, totalExpense };
  };

  // Funciones para manejar el modal
  const openModal = (transaction = null) => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentTransaction(null);
    setIsModalOpen(false);
  };

  // Funciones para manejar el modal de voz
  const openVoiceModal = () => {
    setIsVoiceModalOpen(true);
  };

  const closeVoiceModal = () => {
    setIsVoiceModalOpen(false);
  };

  // Función para refrescar datos
  const refreshData = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories));
        } else {
          setCategories(defaultCategories);
        }

        fetchTransactions();
      } catch (error) {
        console.error('Error loading saved data:', error);
        setError('Error al cargar datos guardados');
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [fetchTransactions]);

  // Guardar transacciones en localStorage cuando cambian
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  // Modificar función para agregar transacción
  const addTransaction = async (transactionData) => {
    try {
      const newTransaction = {
        ...transactionData,
        id: Date.now()
      };

      // Cargar todas las transacciones existentes
      const savedTransactions = localStorage.getItem('transactions');
      let allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];

      // Agregar la nueva transacción
      allTransactions = [newTransaction, ...allTransactions];

      // Guardar en localStorage
      localStorage.setItem('transactions', JSON.stringify(allTransactions));

      // Actualizar estado local (solo las del día seleccionado)
      fetchTransactions();

      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  // Modificar función para actualizar transacción
  const updateTransaction = async (transactionData) => {
    try {
      const id = transactionData.id;

      // Cargar todas las transacciones existentes
      const savedTransactions = localStorage.getItem('transactions');
      let allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];

      // Actualizar la transacción específica
      allTransactions = allTransactions.map(transaction => 
        transaction.id === id ? transactionData : transaction
      );

      // Guardar en localStorage
      localStorage.setItem('transactions', JSON.stringify(allTransactions));

      // Actualizar estado local (solo las del día seleccionado)
      fetchTransactions();

      return transactionData;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  };

  // Modificar función para eliminar transacción
  const deleteTransaction = async (id) => {
    try {
      // Cargar todas las transacciones existentes
      const savedTransactions = localStorage.getItem('transactions');
      let allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];

      // Filtrar la transacción a eliminar
      allTransactions = allTransactions.filter(transaction => transaction.id !== id);

      // Guardar en localStorage
      localStorage.setItem('transactions', JSON.stringify(allTransactions));

      // Actualizar estado local (solo las del día seleccionado)
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  };

  return {
    transactions,
    categories,
    isLoading,
    error,
    selectedDate,
    setSelectedDate,
    showCalendar,
    setShowCalendar,
    isModalOpen,
    currentTransaction,
    openModal,
    closeModal,
    isVoiceModalOpen,
    openVoiceModal,
    closeVoiceModal,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    calculateTotals,
    refreshData
  };
};