const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'fdb1034.awardspace.net',
    user: '4472420_myeconomy',
    password: 'hola12345',
    database: '4472420_myeconomy',
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
    db.end(); // Cierra la conexión después de probar
});
