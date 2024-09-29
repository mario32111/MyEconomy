const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',      // Dirección IP de tu servidor local (localhost)
    user: 'root',           // Usuario de MySQL por defecto en XAMPP
    password: '',           // Contraseña vacía por defecto en XAMPP (ajusta si has cambiado la contraseña)
    database: 'myeconomy',  // Tu base de datos
    port: 3306,             // Puerto de MySQL (por defecto es 3306)
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
