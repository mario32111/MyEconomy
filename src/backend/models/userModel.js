const db = require('../config/db');

// Función para crear un nuevo usuario en la base de datos
const createUser = (userData) => {
    const { name, email, password } = userData;
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, password], (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, name, email });
        });
    });
};

// Función para buscar un usuario por email
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // Devuelve el primer resultado o undefined si no existe
        });
    });
};

module.exports = { createUser, findUserByEmail };
