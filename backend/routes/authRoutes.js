const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);

// Ruta protegida de ejemplo
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        emailVerified: req.user.emailVerified
      }
    }
  });
});

module.exports = router;