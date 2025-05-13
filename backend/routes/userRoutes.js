// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas de perfil
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);

// Ruta para eliminar cuenta
router.delete('/account', userController.deleteAccount);

module.exports = router;