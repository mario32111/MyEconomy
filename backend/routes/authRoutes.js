// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, verifyEmailForce } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.post('/verify-email-force', verifyEmailForce);

// Ruta protegida de ejemplo - Usamos una función anónima directamente
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        firstName: req.user.firstName || req.user.name, // Compatibilidad con ambos formatos
        middleName: req.user.middleName,
        paternalLastName: req.user.paternalLastName,
        maternalLastName: req.user.maternalLastName,
        email: req.user.email,
        emailVerified: req.user.emailVerified
      }
    }
  });
});

module.exports = router;