// backend/controllers/accountController.js
const { Account } = require('../models'); // Solo necesitamos el modelo Account aquí

// --- Obtener todas las cuentas DEL USUARIO autenticado ---
const getUserAccounts = async (req, res, next) => { // Añadimos 'next' para pasar errores
  try {
    // req.user.id es añadido por el middleware 'protect' que pondremos en las rutas
    const userId = req.user.id;

    // Busca todas las cuentas que pertenezcan a este usuario
    const accounts = await Account.findAll({
      where: {
        UserId: userId, // ¡FILTRO CLAVE por ID de usuario!
      },
      order: [['name', 'ASC']], // Ordenar alfabéticamente por nombre, por ejemplo
    });

    res.status(200).json({ success: true, count: accounts.length, data: accounts });

  } catch (error) {
    console.error('Error en getUserAccounts:', error);
    // Pasamos el error al middleware de manejo de errores
    next(error);
  }
};

// --- Crear una nueva cuenta PARA EL USUARIO autenticado ---
const createAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, type, balance } = req.body;

    // Validación básica (puedes hacerla más robusta)
    if (!name || !type || balance === undefined || balance === null) {
      // Creamos un error específico para que lo capture el manejador
      const error = new Error('Faltan datos requeridos (name, type, balance).');
      error.status = 400; // Código de Bad Request
      throw error;
    }
    if (typeof balance !== 'number') {
        const error = new Error('El balance debe ser un número.');
        error.status = 400;
        throw error;
    }

    // Crea la nueva cuenta ASOCIÁNDOLA al usuario actual
    const newAccount = await Account.create({
      name,
      type, // Ej: 'Ahorro', 'Corriente', 'Efectivo'
      balance: parseFloat(balance), // Asegurarse de que sea número
      UserId: userId, // ¡ASIGNACIÓN CLAVE del ID de usuario!
    });

    res.status(201).json({ success: true, data: newAccount });

  } catch (error) {
    console.error('Error en createAccount:', error);
     // Si es un error de validación de Sequelize u otro específico, podría tener un status
    if (!error.status) error.status = 500; // Error genérico del servidor si no tiene status
    next(error); // Pasa al manejador de errores
  }
};

// --- Obtener una cuenta específica DEL USUARIO ---
const getAccountById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const accountId = req.params.id; // Obtiene el ID de la cuenta desde la URL

        const account = await Account.findOne({
            where: {
                id: accountId,
                UserId: userId // ¡Doble verificación: ID de cuenta y pertenencia al usuario!
            }
        });

        if (!account) {
            const error = new Error(`Cuenta no encontrada con ID ${accountId} para este usuario.`);
            error.status = 404; // Not Found
            throw error;
        }

        res.status(200).json({ success: true, data: account });

    } catch (error) {
        console.error('Error en getAccountById:', error);
        if (!error.status) error.status = 500;
        next(error);
    }
};

// --- Actualizar una cuenta específica DEL USUARIO ---
const updateAccount = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const accountId = req.params.id;
        const { name, type, balance } = req.body; // Datos para actualizar

        // Busca la cuenta asegurándose que pertenece al usuario
        let account = await Account.findOne({
            where: {
                id: accountId,
                UserId: userId
            }
        });

        if (!account) {
            const error = new Error(`Cuenta no encontrada con ID ${accountId} para este usuario.`);
            error.status = 404;
            throw error;
        }

        // Actualiza los campos proporcionados
        if (name !== undefined) account.name = name;
        if (type !== undefined) account.type = type;
        if (balance !== undefined) {
            if (typeof balance !== 'number') {
                const error = new Error('El balance debe ser un número.');
                error.status = 400;
                throw error;
            }
            account.balance = parseFloat(balance);
        }


        await account.save(); // Guarda los cambios

        res.status(200).json({ success: true, data: account });

    } catch (error) {
        console.error('Error en updateAccount:', error);
        if (!error.status) error.status = 500;
        next(error);
    }
};

// --- Eliminar una cuenta específica DEL USUARIO ---
const deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const accountId = req.params.id;

        const account = await Account.findOne({
            where: {
                id: accountId,
                UserId: userId
            }
        });

        if (!account) {
            const error = new Error(`Cuenta no encontrada con ID ${accountId} para este usuario.`);
            error.status = 404;
            throw error;
        }

        // Antes de eliminar, podrías querer verificar si hay transacciones asociadas
        // y decidir qué hacer (eliminarlas, reasignarlas, prevenir la eliminación)

        await account.destroy(); // Elimina la cuenta

        res.status(200).json({ success: true, message: 'Cuenta eliminada correctamente.', data: {} }); // O status 204 No Content

    } catch (error) {
        console.error('Error en deleteAccount:', error);
        // Considera errores si hay restricciones de clave foránea (ej. transacciones asociadas)
        if (!error.status) error.status = 500;
        next(error);
    }
};


module.exports = {
  getUserAccounts,
  createAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
};