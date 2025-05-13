import React from 'react';
import { useExpenseTrackerLogic } from './ExpenseTrackerLogic';
import TransactionModal from './TransactionModal';
import VoiceInputModal from './VoiceInputModal';
import GeneralGraph from './GeneralGraph';
import { format, getDaysInMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import styles from './ExpenseTracker.module.css';
// Importaciones de Material UI
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SavingsIcon from '@mui/icons-material/Savings';
// Importación corregida para formatters
import { formatCurrency } from '../../../../shared/utils/formatters';

// Mini componente para mostrar estadísticas
const StatCard = ({ title, value, icon, color, trend }) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon} style={{ backgroundColor: `${color}20`, color }}>
      {icon}
    </div>
    <div className={styles.statInfo}>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statValue}>{value}</div>
      {trend && <div className={styles.statTrend} style={{ color }}>{trend}</div>}
    </div>
  </div>
);

// Mini componente para la gráfica de barras
const MiniBarChart = ({ income, expense }) => {
  const total = Math.abs(income) + Math.abs(expense);
  const incomePercent = total > 0 ? (Math.abs(income) / total) * 100 : 0;
  const expensePercent = total > 0 ? (Math.abs(expense) / total) * 100 : 0;

  return (
    <div className={styles.miniBarChart}>
      <div className={styles.chartTitle}>Resumen del Mes</div>
      <div className={styles.barContainer}>
        <div className={styles.barLabel}>
          <span>Ingresos</span>
          <span>{formatCurrency(income)}</span>
        </div>
        <div className={styles.barWrapper}>
          <div 
            className={styles.barIncome} 
            style={{ width: `${incomePercent}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.barContainer}>
        <div className={styles.barLabel}>
          <span>Gastos</span>
          <span>{formatCurrency(Math.abs(expense))}</span>
        </div>
        <div className={styles.barWrapper}>
          <div 
            className={styles.barExpense} 
            style={{ width: `${expensePercent}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.barContainer}>
        <div className={styles.barLabel}>
          <span>Balance</span>
          <span style={{ color: income + expense >= 0 ? '#10b981' : '#ef4444' }}>
            {formatCurrency(income + expense)}
          </span>
        </div>
      </div>
    </div>
  );
};

const ExpenseTracker = () => {
  const {
    transactions,
    categories,
    isLoading,
    error,
    selectedDate,
    setSelectedDate,
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
    calculateTotals
  } = useExpenseTrackerLogic();

  const { chartData, totalExpense } = calculateTotals();

  // Calcular estadísticas adicionales
  const calculateStats = () => {
    // Obtener todas las transacciones del localStorage
    const savedTransactions = localStorage.getItem('transactions');
    const allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];

    // Obtener el mes actual
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    // Filtrar transacciones del mes actual
    const monthTransactions = allTransactions.filter(transaction => {
      const transDate = new Date(transaction.date);
      return transDate.getMonth() === currentMonth && 
             transDate.getFullYear() === currentYear;
    });

    // Calcular ingresos y gastos del mes
    const monthIncome = monthTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const monthExpense = monthTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);

    // Calcular gasto diario recomendado
    const daysInMonth = getDaysInMonth(selectedDate);
    const remainingDays = daysInMonth - selectedDate.getDate() + 1;
    const dailyBudget = (monthIncome + monthExpense) / remainingDays;

    // Calcular ahorro potencial
    const currentDayOfMonth = selectedDate.getDate();
    const projectedExpense = (Math.abs(monthExpense) / currentDayOfMonth) * daysInMonth;
    const potentialSavings = monthIncome - projectedExpense;

    return {
      monthIncome,
      monthExpense,
      dailyBudget: dailyBudget > 0 ? dailyBudget : 0,
      potentialSavings: potentialSavings > 0 ? potentialSavings : 0
    };
  };

  const stats = calculateStats();

  if (isLoading) {
    return (
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
        <span style={{ marginLeft: '0.75rem', fontSize: '1.125rem', color: '#4b5563' }}>Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorTitle}>Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.expenseTrackerContainer}>
      {/* Stats Row */}
      <div className={styles.statsRow}>
        <StatCard 
          title="Gasto Diario Recomendado" 
          value={formatCurrency(stats.dailyBudget)}
          icon={<TrendingDownIcon />}
          color="#3b82f6"
        />
        <StatCard 
          title="Ahorro Potencial" 
          value={formatCurrency(stats.potentialSavings)}
          icon={<SavingsIcon />}
          color="#10b981"
          trend="Si mantienes este ritmo de gastos"
        />
        <StatCard 
          title="Balance del Mes" 
          value={formatCurrency(stats.monthIncome + stats.monthExpense)}
          icon={<TrendingUpIcon />}
          color={stats.monthIncome + stats.monthExpense >= 0 ? "#10b981" : "#ef4444"}
        />
      </div>

      <div className={styles.gridLayout}>
        {/* Left column - Chart */}
        <div className={styles.chartColumn}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Gastos del Día</h2>
            <div className={styles.formGroup}>
              <div className={styles.calendarContainer}>
                <button 
                  className={styles.calendarNavButton}
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() - 1);
                    setSelectedDate(newDate);
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </button>

                <div 
                  className={styles.calendarWrapper} 
                  onClick={() => {
                    const dateInput = document.getElementById('date-picker');
                    if (dateInput) {
                      dateInput.showPicker();
                    }
                  }}
                >
                  <div className={styles.calendarIcon}>
                    <CalendarTodayIcon />
                  </div>
                  <div className={styles.selectedDate}>
                    {format(selectedDate, 'dd MMM yyyy', { locale: es })}
                  </div>
                  <input
                    id="date-picker"
                    type="date"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => {
                      setSelectedDate(new Date(e.target.value));
                    }}
                    className={styles.hiddenDateInput}
                  />
                </div>

                <button 
                  className={styles.calendarNavButton}
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() + 1);
                    setSelectedDate(newDate);
                  }}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </button>
              </div>
            </div>
            <div className={styles.chartContainer}>
              {chartData && chartData.length > 0 ? (
                <GeneralGraph data={chartData} totalAmount={totalExpense} />
              ) : (
                <div className={styles.emptyState}>
                  <svg className={styles.emptyStateIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <p style={{ color: '#6b7280', textAlign: 'center' }}>No hay datos para mostrar en el período seleccionado</p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem', textAlign: 'center' }}>Agrega transacciones para visualizar tu gráfico</p>
                </div>
              )}
            </div>

            {/* Mini Bar Chart */}
            <MiniBarChart 
              income={stats.monthIncome} 
              expense={stats.monthExpense} 
            />
          </div>
        </div>

        {/* Right column - Transactions */}
        <div className={styles.transactionColumn}>
          <div className={styles.card}>
            <div className={styles.transactionHeader}>
              <div className={styles.transactionTitle}>
                <h2 className={styles.cardTitle}>Transacciones Recientes</h2>
                <span className={styles.transactionDate}>
                  {format(selectedDate, 'dd MMM yyyy', { locale: es })}
                </span>
              </div>
              <div className={styles.transactionActions}>
                <button 
                  className={styles.buttonOutlined}
                  onClick={openVoiceModal}
                >
                  <MicIcon style={{ marginRight: '4px' }} />
                  Voz
                </button>
                <button 
                  className={styles.buttonPrimary}
                  onClick={() => openModal()}
                >
                  <AddIcon style={{ marginRight: '4px' }} />
                  Agregar
                </button>
              </div>
            </div>
            {transactions.length === 0 ? (
              <div className={styles.emptyState}>
                <svg style={{ width: '4rem', height: '4rem', marginBottom: '1rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <p style={{ fontSize: '1.25rem', fontWeight: '500', color: '#6b7280' }}>No hay transacciones</p>
                <p style={{ color: '#9ca3af', marginTop: '0.5rem', textAlign: 'center', maxWidth: '24rem' }}>
                  No se encontraron transacciones en el período seleccionado. Agrega una nueva transacción para comenzar.
                </p>
                <button 
                  className={styles.buttonPrimary}
                  onClick={() => openModal()}
                  style={{ marginTop: '1.5rem' }}
                >
                  <AddIcon style={{ marginRight: '4px' }} />
                  Agregar transacción
                </button>
              </div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeader}>Fecha</th>
                      <th className={styles.tableHeader}>Descripción</th>
                      <th className={styles.tableHeader}>Categoría</th>
                      <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Monto</th>
                      <th className={styles.tableHeader} style={{ textAlign: 'center' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className={styles.tableRow}>
                        <td className={styles.tableCell} style={{ color: '#6b7280' }}>
                          {format(new Date(transaction.date), 'dd MMM yyyy', { locale: es })}
                        </td>
                        <td className={styles.tableCell}>
                          <div style={{ fontWeight: '500', color: '#111827' }}>{transaction.description}</div>
                          {transaction.notes && (
                            <div 
                              className={styles.expandableText}
                              onClick={(e) => {
                                e.currentTarget.classList.toggle(styles.expanded);
                              }}
                            >
                              {transaction.notes}
                            </div>
                          )}
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.categoryBadge} style={{ 
                            backgroundColor: categories.find(c => c.name === transaction.category)?.color + '20' || '#e5e7eb',
                            color: categories.find(c => c.name === transaction.category)?.color || '#374151'
                          }}>
                            {transaction.category}
                          </span>
                        </td>
                        <td className={`${styles.tableCell} ${transaction.amount < 0 ? styles.amountRed : styles.amountGreen}`} style={{ fontWeight: '500', textAlign: 'right' }}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                        <td className={styles.tableCell} style={{ textAlign: 'center' }}>
                          <div className={styles.actionButtonsContainer}>
                            <button 
                              onClick={() => openModal(transaction)}
                              className={`${styles.actionButton} ${styles.actionButtonEdit}`}
                              title="Editar"
                            >
                              <EditIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                            </button>
                            <button 
                              onClick={() => {
                                if (window.confirm('¿Estás seguro de eliminar esta transacción?')) {
                                  deleteTransaction(transaction.id);
                                }
                              }}
                              className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                              title="Eliminar"
                            >
                              <DeleteIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          transaction={currentTransaction}
          categories={categories}
          onSave={currentTransaction ? updateTransaction : addTransaction}
          selectedDate={selectedDate}
        />
      )}

      {isVoiceModalOpen && (
        <VoiceInputModal
          isOpen={isVoiceModalOpen}
          onClose={closeVoiceModal}
          onSave={addTransaction}
          categories={categories}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default ExpenseTracker;
