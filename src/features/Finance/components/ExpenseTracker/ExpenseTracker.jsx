import React from 'react';
import { useExpenseTrackerLogic } from './ExpenseTrackerLogic';
import TransactionModal from './TransactionModal';
import VoiceInputModal from './VoiceInputModal';
import GeneralGraph from './GeneralGraph';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import styles from './ExpenseTracker.module.css';

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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
                  onClick={openVoiceModal} 
                  className={`${styles.button} ${styles.buttonBlue}`}
                >
                  <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                  Voz
                </button>
                <button 
                  onClick={() => openModal()} 
                  className={`${styles.button} ${styles.buttonGreen}`}
                >
                  <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
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
                  onClick={() => openModal()} 
                  className={`${styles.button} ${styles.buttonBlue}`}
                  style={{ marginTop: '1.5rem' }}
                >
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
                              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
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
                              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
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