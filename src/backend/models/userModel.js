const db = require('../config/db'); // Asegúrate de que la configuración de tu base de datos esté bien

// Función para crear un nuevo usuario
const createUser = async (userData) => {
    const { name, email, password } = userData; // Ejemplo de desestructuración

    // Lógica para insertar un nuevo usuario en la base de datos
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, password], (err, results) => {
            if (err) {
                return reject(err);
            }
            // Puedes devolver el ID del nuevo usuario si lo deseas
            resolve({ id: results.insertId, name, email });
        });
    });
};

// Exporta las funciones
module.exports = { createUser };
