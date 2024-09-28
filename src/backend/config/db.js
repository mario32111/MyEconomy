const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'fdb1034.awardspace.net', // Cambia esto a tu host
    user: '4472420_myeconomy',      // Cambia esto a tu usuario
    password: 'hola12345',          // Cambia esto a tu contraseña
    database: '4472420_myeconomy',  // Cambia esto a tu base de datos
    port: 3306,
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db; // Exporta la conexión
