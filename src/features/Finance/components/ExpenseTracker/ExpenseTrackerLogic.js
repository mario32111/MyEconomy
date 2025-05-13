import { useState, useEffect, useCallback } from 'react';
import { defaultCategories } from './categoryData';
import { startOfDay, endOfDay, isSameDay } from 'date-fns';
import { authService } from '../../../../shared/services/authService';
import * as financeService from '../../../../shared/services/financeService';

export const useExpenseTrackerLogic = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Obtener el usuario actual
  const user = authService.getCurrentUser();

  // Función para obtener transacciones
  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Primero intentar obtener datos del localStorage
      const savedTransactions = localStorage.getItem('transactions');
      let localTransactions = [];
      
      if (savedTransactions) {
        const allTransactions = JSON.parse(savedTransactions);
        localTransactions = allTransactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return isSameDay(transactionDate, selectedDate);
        });
        
        // Si hay datos locales, usarlos inmediatamente
        setTransactions(localTransactions);
      }

      // Configurar filtros de fecha para Supabase
      const startDate = startOfDay(selectedDate);
      const endDate = endOfDay(selectedDate);

      // Intentar obtener datos de Supabase en segundo plano
      const data = await financeService.getTransactions({
        startDate,
        endDate
      });

      // Si hay datos de Supabase y son diferentes a los locales, actualizarlos
      if (data && data.length > 0) {
        // Solo actualizar si hay diferencias significativas
        if (data.length !== localTransactions.length) {
          setTransactions(data);
          
          // Actualizar localStorage con los datos más recientes
          const savedAllTransactions = localStorage.getItem('transactions');
          let allTransactions = savedAllTransactions ? JSON.parse(savedAllTransactions) : [];
          
          // Filtrar transacciones que no son del día seleccionado
          const otherDaysTransactions = allTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return !isSameDay(transactionDate, selectedDate);
          });
          
          // Combinar con las nuevas transacciones del día
          allTransactions = [...data, ...otherDaysTransactions];
          localStorage.setItem('transactions', JSON.stringify(allTransactions));
        }
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      // No mostrar error si ya tenemos datos locales
      if (transactions.length === 0) {
        setError('Error al cargar las transacciones. Usando datos locales.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, transactions.length]);

  // Calcular totales para el gráfico
  const calculateTotals = () => {
    // Filtrar transacciones de la fecha seleccionada (solo gastos)
    const todayTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return isSameDay(transactionDate, selectedDate) && transaction.amount < 0;
    });

    console.log("Today's expense transactions:", todayTransactions);

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
      const categoryData = categories.find(cat => cat.name === name) || { 
        color: '#' + Math.floor(Math.random()*16777215).toString(16) 
      };

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

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Primero cargar categorías desde localStorage
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories));
        } else {
          // Si no hay categorías en localStorage, usar las predeterminadas
          setCategories(defaultCategories);
          localStorage.setItem('categories', JSON.stringify(defaultCategories));
        }

        // Intentar cargar categorías desde Supabase en segundo plano
        try {
          const categoriesData = await financeService.getCategories();
          if (categoriesData && categoriesData.length > 0) {
            setCategories(categoriesData);
            localStorage.setItem('categories', JSON.stringify(categoriesData));
          }
        } catch (categoryError) {
          console.error('Error loading categories from Supabase:', categoryError);
          // No mostrar error, ya tenemos categorías locales
        }

        // Cargar cuentas
        try {
          const accountsData = await financeService.getAccounts();
          setAccounts(accountsData);
        } catch (accountError) {
          console.error('Error loading accounts:', accountError);
          // No es crítico para la visualización
        }

        // Cargar transacciones
        await fetchTransactions();
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error al cargar datos. Usando datos locales.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchTransactions]);

  // Función para agregar transacción
  const addTransaction = async (transactionData) => {
    try {
      // Asegurarse de que la fecha sea un objeto Date
      const transactionDate = transactionData.date instanceof Date 
        ? transactionData.date 
        : new Date(transactionData.date);

      // Primero guardar localmente
      const now = new Date().toISOString();
      const newTransaction = {
        ...transactionData,
        id: Date.now().toString(),
        date: transactionDate.toISOString(),
        createdAt: now,
        updatedAt: now
      };

      // Guardar en localStorage
      const savedTransactions = localStorage.getItem('transactions');
      let allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];
      allTransactions = [newTransaction, ...allTransactions];
      localStorage.setItem('transactions', JSON.stringify(allTransactions));

      // Actualizar estado si es del día seleccionado
      if (isSameDay(transactionDate, selectedDate)) {
        setTransactions(prev => [newTransaction, ...prev]);
      }

      // Intentar guardar en Supabase en segundo plano
      try {
        const supabaseTransaction = await financeService.addTransaction({
          ...transactionData,
          date: transactionDate.toISOString()
        });
        
        // Si se guardó correctamente en Supabase, actualizar el ID en localStorage
        if (supabaseTransaction && supabaseTransaction.id) {
          const updatedTransactions = allTransactions.map(t => 
            t.id === newTransaction.id ? { ...t, id: supabaseTransaction.id } : t
          );
          localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
          
          // Actualizar también en el estado si es necesario
          if (isSameDay(transactionDate, selectedDate)) {
            setTransactions(prev => 
              prev.map(t => t.id === newTransaction.id ? { ...t, id: supabaseTransaction.id } : t)
            );
          }
        }
      } catch (supabaseError) {
        console.error('Error saving to Supabase (will retry later):', supabaseError);
        // No mostrar error al usuario, ya tenemos guardado localmente
      }

      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  // Función para actualizar transacción
  const updateTransaction = async (transactionData) => {
    try {
      // Asegurarse de que la fecha sea un objeto Date
      const transactionDate = transactionData.date instanceof Date 
        ? transactionData.date 
        : new Date(transactionData.date);

      // Primero actualizar localmente
      const updatedTransaction = {
        ...transactionData,
        date: transactionDate.toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Actualizar en localStorage
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
        let allTransactions = JSON.parse(savedTransactions);
        allTransactions = allTransactions.map(t => 
          t.id === transactionData.id ? updatedTransaction : t
        );
        localStorage.setItem('transactions', JSON.stringify(allTransactions));
      }

      // Actualizar estado si es necesario
      setTransactions(prev => {
        if (!isSameDay(transactionDate, selectedDate)) {
          return prev.filter(t => t.id !== updatedTransaction.id);
        }
        return prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t);
      });

      // Intentar actualizar en Supabase en segundo plano
      try {
        await financeService.updateTransaction({
          ...transactionData,
          date: transactionDate.toISOString()
        });
      } catch (supabaseError) {
        console.error('Error updating in Supabase (will retry later):', supabaseError);
        // No mostrar error al usuario, ya tenemos actualizado localmente
      }

      return updatedTransaction;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  };

  // Función para eliminar transacción
  const deleteTransaction = async (id) => {
    try {
      // Primero eliminar localmente
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
        let allTransactions = JSON.parse(savedTransactions);
        allTransactions = allTransactions.filter(t => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(allTransactions));
      }

      // Actualizar estado
      setTransactions(prev => prev.filter(t => t.id !== id));

      // Intentar eliminar en Supabase en segundo plano
      try {
        await financeService.deleteTransaction(id);
      } catch (supabaseError) {
        console.error('Error deleting from Supabase (will retry later):', supabaseError);
        // No mostrar error al usuario, ya tenemos eliminado localmente
      }

      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  };

  return {
    transactions,
    categories,
    accounts,
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
    refreshData: fetchTransactions,
    user
  };
};