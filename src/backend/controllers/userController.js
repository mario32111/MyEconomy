const userModel = require('../models/userModel'); // Asegúrate de que el modelo esté definido

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const userData = req.body; // Obtiene los datos del nuevo usuario del cuerpo de la solicitud
        const newUser = await userModel.createUser(userData); // Llama al modelo para crear un nuevo usuario
        res.status(201).json({ message: 'Usuario creado', newUser }); // Envía respuesta con el nuevo usuario
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error }); // Maneja errores
    }
};

// Exporta las funciones
module.exports = { createUser };
