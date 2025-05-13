// src/features/Finance/components/ExpenseTracker/EnhancedExpenseTracker.jsx
import React from 'react';
import { useExpenseTrackerLogic } from './ExpenseTrackerLogic';
import TransactionModal from './TransactionModal';
import VoiceInputModal from './VoiceInputModal';
import GeneralGraph from './GeneralGraph';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { formatCurrency } from '../../../../shared/utils/formatters';

// Import global UI components
import Card from '../../../../shared/components/UI/Card/Card';
import Button from '../../../../shared/components/UI/Button/Button';

const EnhancedExpenseTracker = () => {
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1">{error}</Typography>
      </Box>
    );
  }

  // Date navigation component
  const DateNavigation = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <IconButton 
        onClick={() => {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() - 1);
          setSelectedDate(newDate);
        }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          px: 2, 
          py: 1,
          mx: 1,
          cursor: 'pointer'
        }}
        onClick={() => {
          const dateInput = document.getElementById('date-picker');
          if (dateInput) {
            dateInput.showPicker();
          }
        }}
      >
        <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="body1">
          {format(selectedDate, 'dd MMM yyyy', { locale: es })}
        </Typography>
        <input
          id="date-picker"
          type="date"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => {
            setSelectedDate(new Date(e.target.value));
          }}
          style={{ 
            position: 'absolute', 
            opacity: 0, 
            width: '1px', 
            height: '1px' 
          }}
        />
      </Box>

      <IconButton 
        onClick={() => {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() + 1);
          setSelectedDate(newDate);
        }}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );

  // Empty state component
  const EmptyState = ({ type }) => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      py: 4 
    }}>
      <ReceiptLongIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {type === 'chart' ? 'No hay datos para mostrar' : 'No hay transacciones'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
        {type === 'chart' 
          ? 'Agrega transacciones para visualizar tu gráfico' 
          : 'No se encontraron transacciones en el período seleccionado'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => openModal()}
      >
        Agregar transacción
      </Button>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <DateNavigation />
        <Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<MicIcon />}
            onClick={openVoiceModal}
            sx={{ mr: 1 }}
          >
            Voz
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => openModal()}
          >
            Agregar
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Chart Card */}
        <Card
          title="Gastos por Categoría"
          elevation={2}
          rounded
          sx={{ flex: 1 }}
        >
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {chartData && chartData.length > 0 ? (
              <GeneralGraph data={chartData} totalAmount={totalExpense} />
            ) : (
              <EmptyState type="chart" />
            )}
          </Box>
        </Card>

        {/* Transactions Card */}
        <Card
          title={`Transacciones (${format(selectedDate, 'dd MMM yyyy', { locale: es })})`}
          elevation={2}
          rounded
          sx={{ flex: 1 }}
        >
          {transactions.length === 0 ? (
            <EmptyState type="transactions" />
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell align="right">Monto</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {transaction.description}
                        </Typography>
                        {transaction.notes && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ 
                              display: 'block',
                              maxWidth: '200px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {transaction.notes}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.category}
                          size="small"
                          sx={{ 
                            backgroundColor: categories.find(c => c.name === transaction.category)?.color + '20' || '#e5e7eb',
                            color: categories.find(c => c.name === transaction.category)?.color || '#374151',
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography 
                          variant="body2" 
                          fontWeight="medium"
                          color={transaction.amount < 0 ? 'error.main' : 'success.main'}
                        >
                          {formatCurrency(Math.abs(transaction.amount))}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => openModal(transaction)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => {
                              if (window.confirm('¿Estás seguro de eliminar esta transacción?')) {
                                deleteTransaction(transaction.id);
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Box>

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
    </Box>
  );
};

export default EnhancedExpenseTracker;
