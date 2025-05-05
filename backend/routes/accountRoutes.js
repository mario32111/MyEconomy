// backend/routes/accountRoutes.js
const express = require('express');
const {
    getUserAccounts,
    createAccount,
    getAccountById,
    updateAccount,
    deleteAccount
} = require('../controllers/accountController'); // Importa los controladores
const { protect } = require('../middleware/authMiddleware'); // Importa el middleware de protección

const router = express.Router();

// --- Aplicar Middleware de Protección ---
// Este middleware se ejecutará ANTES que cualquier controlador en este archivo.
// Verifica el token JWT. Si es válido, añade req.user. Si no, devuelve error 401.
router.use(protect);

// --- Definir Rutas Específicas para /api/accounts ---

// GET /api/accounts/ -> Obtiene todas las cuentas del usuario logueado
router.get('/', getUserAccounts);

// POST /api/accounts/ -> Crea una nueva cuenta para el usuario logueado
router.post('/', createAccount);

// GET /api/accounts/:id -> Obtiene una cuenta específica por ID (del usuario logueado)
router.get('/:id', getAccountById);

// PUT /api/accounts/:id -> Actualiza una cuenta específica por ID (del usuario logueado)
router.put('/:id', updateAccount);

// DELETE /api/accounts/:id -> Elimina una cuenta específica por ID (del usuario logueado)
router.delete('/:id', deleteAccount);


module.exports = router;