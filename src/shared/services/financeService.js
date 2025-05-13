import { authService } from './authService';

// Usar el cliente de Supabase ya configurado en authService
const supabase = authService.supabase;

/**
 * Obtiene las transacciones del usuario desde Supabase
 * @param {Object} options - Opciones de filtrado
 * @returns {Promise<Array>} - Lista de transacciones
 */
export const getTransactions = async (options = {}) => {
  try {
    const user = authService.getCurrentUser();

    if (!user || !user.id) {
    console.warn('getTransactions: No hay usuario autenticado');
    return [];
    }

    console.log('Getting transactions for user:', user.id, 'with options:', options);

    // Construir la consulta base
    let query = supabase
    .from('transactions')
    .select(`
    id,
    type,
    amount,
    description,
    date,
    "createdAt",
    "updatedAt",
    categories(id, name, color, icon)
    `)
    .eq('userId', user.id);

    // Aplicar filtros si existen
    if (options.startDate) {
    query = query.gte('date', options.startDate.toISOString());
    }

    if (options.endDate) {
    query = query.lte('date', options.endDate.toISOString());
    }

    if (options.category) {
    query = query.eq('categoryId', options.category);
    }

    if (options.account) {
    query = query.eq('accountId', options.account);
    }

    // Ordenar por fecha descendente (más reciente primero)
    query = query.order('date', { ascending: false });

    const { data, error } = await query;

    if (error) {
    console.error('Error en consulta Supabase:', error);
    throw error;
    }

    console.log('Raw transactions data from Supabase:', data);

    // Transformar los datos para que coincidan con el formato esperado
    const transformedData = (data || []).map(transaction => ({
    id: transaction.id,
    amount: transaction.type === 'expense' ? -Math.abs(transaction.amount) : transaction.amount,
    description: transaction.description || '',
    date: transaction.date,
    category: transaction.categories?.name || 'Sin categoría',
    categoryColor: transaction.categories?.color || '#cccc',
    categoryIcon: transaction.categories?.icon || 'receipt',
    notes: transaction.description || '',
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt
    }));

    console.log('Transformed transactions data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error en getTransactions:', error);

    // Intentar obtener datos del localStorage como respaldo
    try {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
    const parsedTransactions = JSON.parse(savedTransactions);
    console.log('Using local transactions as fallback:', parsedTransactions);
    return parsedTransactions;
    }
    } catch (localError) {
    console.error('Error al obtener transacciones locales:', localError);
    }

    return [];
  }
};

/**
 * Obtiene las categorías disponibles
 * @returns {Promise<Array>} - Lista de categorías
 */
export const getCategories = async () => {
  try {
    const user = authService.getCurrentUser();

    if (!user || !user.id) {
    console.warn('getCategories: No hay usuario autenticado');
    return [];
    }

    console.log('Getting categories for user:', user.id);

    // Obtener categorías del sistema y del usuario
    const { data, error } = await supabase
    .from('categories')
    .select('*')
    .or(`userId.is.null,userId.eq.${user.id}`);

    if (error) {
    console.error('Error en consulta de categorías:', error);
    throw error;
    }

    console.log('Raw categories data from Supabase:', data);

    // Transformar los datos para que coincidan con el formato esperado
    const transformedData = (data || []).map(category => ({
    id: category.id,
    name: category.name,
    type: category.type,
    color: category.color || '#0000',
    icon: category.icon || 'category'
    }));

    console.log('Transformed categories data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error en getCategories:', error);

    // Intentar obtener datos del localStorage como respaldo
    try {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
    const parsedCategories = JSON.parse(savedCategories);
    console.log('Using local categories as fallback:', parsedCategories);
    return parsedCategories;
    }
    } catch (localError) {
    console.error('Error al obtener categorías locales:', localError);
    }

    // Devolver categorías predeterminadas
    const defaultCategories = [
    { id: '1', name: 'Comida', type: 'expense', color: '#FF5722', icon: 'restaurant' },
    { id: '2', name: 'Transporte', type: 'expense', color: '#2196F3', icon: 'directions_car' },
    { id: '3', name: 'Entretenimiento', type: 'expense', color: '#9C27B0', icon: 'movie' },
    { id: '4', name: 'Servicios', type: 'expense', color: '#4CAF50', icon: 'power' },
    { id: '5', name: 'Salud', type: 'expense', color: '#F44336', icon: 'local_hospital' },
    { id: '6', name: 'Educación', type: 'expense', color: '#FF9800', icon: 'school' },
    { id: '7', name: 'Ingreso', type: 'income', color: '#4CAF50', icon: 'attach_money' }
    ];
    console.log('Using default categories:', defaultCategories);
    return defaultCategories;
  }
};

/**
 * Obtiene las cuentas del usuario
 * @returns {Promise<Array>} - Lista de cuentas
 */
export const getAccounts = async () => {
  try {
    const user = authService.getCurrentUser();

    if (!user || !user.id) {
    console.warn('getAccounts: No hay usuario autenticado');
    return [];
    }

    console.log('Getting accounts for user:', user.id);

    const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('userId', user.id);

    if (error) {
    console.error('Error en consulta de cuentas:', error);
    throw error;
    }

    console.log('Raw accounts data from Supabase:', data);

    // Si no hay cuentas, crear una cuenta predeterminada
    if (!data || data.length === 0) {
    console.log('No accounts found, creating default account');
    const defaultAccount = await createDefaultAccount(user.id);
    return defaultAccount ? [defaultAccount] : [];
    }

    return data;
  } catch (error) {
    console.error('Error en getAccounts:', error);
    return [];
  }
};

/**
 * Crea una cuenta predeterminada para el usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} - Cuenta creada
 */
const createDefaultAccount = async (userId) => {
  try {
    const now = new Date().toISOString();

    console.log('Creating default account for user:', userId);

    const { data, error } = await supabase
    .from('accounts')
    .insert({
    userId: userId,
    name: 'Cuenta Principal',
    type: 'checking',
    balance: 0,
    currency: 'MXN',
    createdAt: now,
    updatedAt: now
    })
    .select();

    if (error) {
    console.error('Error al crear cuenta predeterminada:', error);
    throw error;
    }

    console.log('Default account created:', data[0]);
    return data[0];
  } catch (error) {
    console.error('Error al crear cuenta predeterminada:', error);
    return null;
  }
};

/**
 * Añade una nueva transacción
 * @param {Object} transaction - Datos de la transacción
 * @returns {Promise<Object>} - Transacción creada
 */
export const addTransaction = async (transaction) => {
  try {
    const user = authService.getCurrentUser();

    if (!user || !user.id) {
    throw new Error('No hay usuario autenticado');
    }

    console.log('Adding transaction for user:', user.id, 'transaction:', transaction);

    // Obtener la cuenta principal del usuario
    const accounts = await getAccounts();
    if (!accounts || accounts.length === 0) {
    throw new Error('No se encontraron cuentas para el usuario');
    }

    const mainAccount = accounts[0];
    console.log('Using account:', mainAccount);

    // Buscar la categoría por nombre
    let categoryId = null;
    if (transaction.category) {
    const categories = await getCategories();
    const category = categories.find(c => c.name === transaction.category);
    if (category) {
    categoryId = category.id;
    console.log('Found category ID:', categoryId, 'for category:', transaction.category);
    }
    }

    // Determinar el tipo de transacción
    const type = transaction.amount < 0 ? 'expense' : 'income';
    const now = new Date().toISOString();

    // Preparar datos para insertar
    const transactionData = {
    userId: user.id,
    accountId: mainAccount.id,
    categoryId: categoryId,
    type: type,
    amount: Math.abs(transaction.amount),
    description: transaction.description || '',
    date: transaction.date || now,
    createdAt: now,
    updatedAt: now
    };

    console.log('Prepared transaction data for insert:', transactionData);

    // Insertar en Supabase
    const { data, error } = await supabase
    .from('transactions')
    .insert([transactionData])
    .select();

    if (error) {
    console.error('Error al insertar transacción:', error);
    throw error;
    }

    console.log('Transaction inserted successfully:', data[0]);

    // Actualizar el balance de la cuenta
    await updateAccountBalance(mainAccount.id, transaction.amount);

    // Transformar la respuesta al formato esperado
    const newTransaction = {
    id: data[0].id,
    amount: type === 'expense' ? -Math.abs(data[0].amount) : data[0].amount,
    description: data[0].description || '',
    date: data[0].date,
    category: transaction.category || 'Sin categoría',
    notes: transaction.notes || '',
    createdAt: data[0].createdAt,
    updatedAt: data[0].updatedAt
    };

    console.log('Transformed new transaction:', newTransaction);

    // Guardar también en localStorage como respaldo
    try {
    const savedTransactions = localStorage.getItem('transactions');
    let allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    allTransactions = [newTransaction, ...allTransactions];
    localStorage.setItem('transactions', JSON.stringify(allTransactions));
    console.log('Transaction saved to localStorage');
    } catch (localError) {
    console.error('Error al guardar transacción localmente:', localError);
    }

    return newTransaction;
  } catch (error) {
    console.error('Error en addTransaction:', error);

    // Si falla Supabase, intentar guardar localmente
    if (transaction) {
    try {
    const now = new Date().toISOString();
    const newTransaction = {
    ...transaction,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now
    };

    const savedTransactions = localStorage.getItem('transactions');
    let allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    allTransactions = [newTransaction, ...allTransactions];
    localStorage.setItem('transactions', JSON.stringify(allTransactions));
    console.log('Transaction saved to localStorage as fallback');

    return newTransaction;
    } catch (localError) {
    console.error('Error al guardar transacción localmente:', localError);
    }
    }

    throw error;
  }
};

/**
 * Actualiza el balance de una cuenta
 * @param {string} accountId - ID de la cuenta
 * @param {number} amount - Monto a añadir al balance (positivo o negativo)
 */
const updateAccountBalance = async (accountId, amount) => {
  try {
    console.log('Updating account balance:', { accountId, amount });

    // Obtener balance actual
    const { data, error } = await supabase
    .from('accounts')
    .select('balance')
    .eq('id', accountId)
    .single();

    if (error) {
    console.error('Error al obtener balance de cuenta:', error);
    throw error;
    }

    // Calcular nuevo balance
    const newBalance = (parseFloat(data.balance) || 0) + parseFloat(amount);
    console.log('New balance calculated:', { currentBalance: data.balance, newBalance });

    // Actualizar balance
    const { error: updateError } = await supabase
    .from('accounts')
    .update({ 
    balance: newBalance,
    updatedAt: new Date().toISOString()
    })
    .eq('id', accountId);

    if (updateError) {
    console.error('Error al actualizar balance de cuenta:', updateError);
    throw updateError;
    }

    console.log('Account balance updated successfully');
  } catch (error) {
    console.error('Error al actualizar balance de cuenta:', error);
  }
};

/**
 * Actualiza una transacción existente
 * @param {Object} transaction - Datos actualizados de la transacción
 * @returns {Promise<Object>} - Transacción actualizada
 */
export const updateTransaction = async (transaction) => {
  try {
    const user = authService.getCurrentUser();

    if (!user || !user.id) {
    throw new Error('No hay usuario autenticado');
    }

    if (!transaction.id) {
    throw new Error('Se requiere el ID de la transacción');
    }

    console.log('Updating transaction:', transaction);

    // Obtener la transacción original para calcular el cambio en el balance
    const { data: originalTransaction, error: getError } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', transaction.id)
    .eq('userId', user.id)
    .single();

    if (getError) {
    console.error('Error al obtener transacción original:', getError);
    throw getError;
    }

    console.log('Original transaction:', originalTransaction);

    // Buscar la categoría por nombre
    let categoryId = null;
    if (transaction.category) {
    const categories = await getCategories();
    const category = categories.find(c => c.name === transaction.category);
    if (category) {
    categoryId = category.id;
    console.log('Found category ID:', categoryId, 'for category:', transaction.category);
    }
    }

    // Determinar el tipo de transacción
    const type = transaction.amount < 0 ? 'expense' : 'income';

    // Preparar datos para actualizar
    const transactionData = {
    categoryId: categoryId,
    type: type,
    amount: Math.abs(transaction.amount),
    description: transaction.description || '',
    date: transaction.date || new Date().toISOString(),
    updatedAt: new Date().toISOString()
    };

    console.log('Prepared transaction data for update:', transactionData);

    // Actualizar en Supabase
    const { data, error } = await supabase
    .from('transactions')
    .update(transactionData)
    .eq('id', transaction.id)
    .eq('userId', user.id)
    .select();

    if (error) {
    console.error('Error al actualizar transacción:', error);
    throw error;
    }

    console.log('Transaction updated successfully:', data[0]);

    // Calcular el cambio en el balance
    const originalAmount = originalTransaction.type === 'expense' 
    ? -Math.abs(originalTransaction.amount) 
    : originalTransaction.amount;

    const amountDifference = transaction.amount - originalAmount;
    console.log('Amount difference for balance update:', { originalAmount, newAmount: transaction.amount, difference: amountDifference });

    // Actualizar el balance de la cuenta
    if (amountDifference !== 0) {
    await updateAccountBalance(originalTransaction.accountId, amountDifference);
    }

    // Transformar la respuesta al formato esperado
    const updatedTransaction = {
    id: data[0].id,
    amount: type === 'expense' ? -Math.abs(data[0].amount) : data[0].amount,
    description: data[0].description || '',
    date: data[0].date,
    category: transaction.category || 'Sin categoría',
    notes: transaction.notes || '',
    createdAt: data[0].createdAt,
    updatedAt: data[0].updatedAt
    };

    console.log('Transformed updated transaction:', updatedTransaction);

    // Actualizar también en localStorage como respaldo
    try {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
    let allTransactions = JSON.parse(savedTransactions);
    allTransactions = allTransactions.map(t => 
    t.id === transaction.id ? updatedTransaction : t
    );
    localStorage.setItem('transactions', JSON.stringify(allTransactions));
    console.log('Transaction updated in localStorage');
    }
    } catch (localError) {
    console.error('Error al actualizar transacción localmente:', localError);
    }

    return updatedTransaction;
  } catch (error) {
    console.error('Error en updateTransaction:', error);

    // Si falla Supabase, intentar actualizar localmente
    if (transaction && transaction.id) {
    try {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
    let allTransactions = JSON.parse(savedTransactions);
    const updatedTransaction = {
    ...transaction,
    updatedAt: new Date().toISOString()
    };

    allTransactions = allTransactions.map(t => 
    t.id === transaction.id ? updatedTransaction : t
    );

    localStorage.setItem('transactions', JSON.stringify(allTransactions));
    console.log('Transaction updated in localStorage as fallback');
    return updatedTransaction;
    }
    } catch (localError) {
    console.error('Error al actualizar transacción localmente:', localError);
    }
    }

    throw error;
  }
};

/**
 * Elimina una transacción
 * @param {string} transactionId - ID de la transacción
 * @returns {Promise<boolean>} - Éxito de la operación
 */
export const deleteTransaction = async (transactionId) => {
  try {
    const user = authService.getCurrentUser();

    if (!user || !user.id) {
    throw new Error('No hay usuario autenticado');
    }

    if (!transactionId) {
    throw new Error('Se requiere el ID de la transacción');
    }

    console.log('Deleting transaction:', transactionId);

    // Obtener la transacción para actualizar el balance
    const { data: transaction, error: getError } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', transactionId)
    .eq('userId', user.id)
    .single();

    if (getError) {
    console.error('Error al obtener transacción para eliminar:', getError);
    throw getError;
    }

    console.log('Transaction to delete:', transaction);

    // Eliminar de Supabase
    const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', transactionId)
    .eq('userId', user.id);

    if (error) {
    console.error('Error al eliminar transacción:', error);
    throw error;
    }

    console.log('Transaction deleted successfully');

    // Actualizar el balance de la cuenta (revertir la transacción)
    const amount = transaction.type === 'expense' 
    ? Math.abs(transaction.amount) 
    : -Math.abs(transaction.amount);

    console.log('Updating account balance after deletion:', { accountId: transaction.accountId, amount });
    await updateAccountBalance(transaction.accountId, amount);

    // Eliminar también de localStorage como respaldo
    try {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
    let allTransactions = JSON.parse(savedTransactions);
    allTransactions = allTransactions.filter(t => t.id !== transactionId);
    localStorage.setItem('transactions', JSON.stringify(allTransactions));
    console.log('Transaction removed from localStorage');
    }
    } catch (localError) {
    console.error('Error al eliminar transacción localmente:', localError);
    }

    return true;
  } catch (error) {
    console.error('Error en deleteTransaction:', error);

    // Si falla Supabase, intentar eliminar localmente
    try {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
    let allTransactions = JSON.parse(savedTransactions);
    allTransactions = allTransactions.filter(t => t.id !== transactionId);
    localStorage.setItem('transactions', JSON.stringify(allTransactions));
    console.log('Transaction removed from localStorage as fallback');
    return true;
    }
    } catch (localError) {
    console.error('Error al eliminar transacción localmente:', localError);
    }

    throw error;
  }
};

/**
 * Obtiene el resumen financiero del usuario
 * @param {Object} options - Opciones de filtrado por fecha
 * @returns {Promise<Object>} - Resumen financiero
 */
export const getFinancialSummary = async (options = {}) => {
  try {
    const user = authService.getCurrentUser();

    if (!user || !user.id) {
    console.warn('getFinancialSummary: No hay usuario autenticado');
    return { income: 0, expenses: 0, balance: 0 };
    }

    console.log('Getting financial summary for user:', user.id, 'with options:', options);

    // Obtener todas las cuentas del usuario
    const { data: accounts, error: accountsError } = await supabase
    .from('accounts')
    .select('id, balance')
    .eq('userId', user.id);

    if (accountsError) {
    console.error('Error al obtener cuentas para resumen:', accountsError);
    throw accountsError;
    }

    console.log('Accounts for summary:', accounts);

    // Calcular balance total de todas las cuentas
    const totalBalance = (accounts || []).reduce((sum, account) => sum + parseFloat(account.balance || 0), 0);

    // Obtener transacciones del período
    let query = supabase
    .from('transactions')
    .select('type, amount')
    .eq('userId', user.id);

    if (options.startDate) {
    query = query.gte('date', options.startDate.toISOString());
    }

    if (options.endDate) {
    query = query.lte('date', options.endDate.toISOString());
    }

    const { data: transactions, error: transactionsError } = await query;

    if (transactionsError) {
    console.error('Error al obtener transacciones para resumen:', transactionsError);
    throw transactionsError;
    }

    console.log('Transactions for summary:', transactions);

    // Calcular ingresos y gastos del período
    let income = 0;
    let expenses = 0;

    (transactions || []).forEach(transaction => {
    if (transaction.type === 'income') {
    income += parseFloat(transaction.amount || 0);
    } else {
    expenses += parseFloat(transaction.amount || 0);
    }
    });

    const summary = {
    income,
    expenses,
    balance: totalBalance
    };

    console.log('Financial summary calculated:', summary);
    return summary;
  } catch (error) {
    console.error('Error en getFinancialSummary:', error);

    // Intentar obtener datos del perfil del usuario como respaldo
    const user = authService.getCurrentUser();
    if (user) {
    const fallbackSummary = {
    income: parseFloat(user.monthlyIncome || 0),
    expenses: parseFloat(user.monthlyExpenses || 0),
    balance: parseFloat(user.currentSavings || 0)
    };
    console.log('Using profile data as fallback for summary:', fallbackSummary);
    return fallbackSummary;
    }

    return { income: 0, expenses: 0, balance: 0 };
  }
};

/**
 * Obtiene las estadísticas de gastos por categoría
 * @param {Object} options - Opciones de filtrado
 * @returns {Promise<Array>} - Estadísticas por categoría
 */
export const getCategoryStats = async (options = {}) => {
  try {
    const user = authService.getCurrentUser();

    if (!user || !user.id) {
    console.warn('getCategoryStats: No hay usuario autenticado');
    return [];
    }

    console.log('Getting category stats for user:', user.id, 'with options:', options);

    // Obtener transacciones filtradas (solo gastos)
    let query = supabase
    .from('transactions')
    .select(`
    amount,
    categories(id, name, color, icon)
    `)
    .eq('userId', user.id)
    .eq('type', 'expense');

    if (options.startDate) {
    query = query.gte('date', options.startDate.toISOString());
    }

    if (options.endDate) {
    query = query.lte('date', options.endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
    console.error('Error al obtener estadísticas por categoría:', error);
    throw error;
    }

    console.log('Raw category stats data:', data);

    if (!data || data.length === 0) {
    return [];
    }

    // Agrupar por categoría
    const categoryMap = {};

    data.forEach(transaction => {
    const categoryName = transaction.categories?.name || 'Sin categoría';
    const categoryColor = transaction.categories?.color || '#cccc';
    const categoryIcon = transaction.categories?.icon || 'help';

    if (!categoryMap[categoryName]) {
    categoryMap[categoryName] = {
    name: categoryName,
    color: categoryColor,
    icon: categoryIcon,
    amount: 0,
    count: 0
    };
    }

    categoryMap[categoryName].amount += parseFloat(transaction.amount || 0);
    categoryMap[categoryName].count += 1;
    });

    // Convertir a array y calcular porcentajes
    const totalAmount = Object.values(categoryMap).reduce((sum, item) => sum + item.amount, 0);

    const stats = Object.values(categoryMap).map(item => ({
    ...item,
    percentage: totalAmount > 0 ? (item.amount / totalAmount) * 100 : 0
    }));

    console.log('Processed category stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error en getCategoryStats:', error);
    return [];
  }
};

// Crear un objeto con todas las funciones para exportar como default
const financeServiceExports = {
  getTransactions,
  getCategories,
  getAccounts,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getFinancialSummary,
  getCategoryStats
};

// Exportar el objeto con nombre para evitar el warning de ESLint
export default financeServiceExports;
