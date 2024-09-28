const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa el controlador

// Rutas de usuarios
router.get('/', (req, res) => {
    res.send('Lista de usuarios'); // Aquí puedes integrar la lógica para obtener usuarios
});

// Ruta para crear un nuevo usuario usando el controlador
router.post('/', userController.createUser); // Llama al controlador para crear un usuario

// Ruta para login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Lógica para verificar el usuario (esto es solo un ejemplo, en un caso real deberías usar una base de datos)
    if (email === 'user@example.com' && password === 'password123') {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
