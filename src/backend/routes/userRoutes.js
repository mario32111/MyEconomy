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
router.post('/login', userController.loginUser);
module.exports = router;
