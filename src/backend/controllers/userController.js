const userModel = require('../models/userModel'); // Modelo de usuario

// Función para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const userData = req.body; // Obtiene los datos del nuevo usuario del cuerpo de la solicitud
        const newUser = await userModel.createUser(userData); // Llama al modelo para crear un nuevo usuario
        res.status(201).json({ message: 'Usuario creado', newUser }); // Envía respuesta con el nuevo usuario
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error }); // Maneja errores
    }
};

// Función para login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al usuario en la base de datos por email
        const user = await userModel.findUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Si las credenciales son correctas
        res.status(200).json({ message: 'Login exitoso', user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error });
    }
};


module.exports = { createUser, loginUser };
