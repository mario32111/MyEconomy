const mysql = require('mysql2');

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'serversito.synology.me',      // Dirección IP de tu servidor local (localhost)
    user: 'root',           // Usuario de MySQL por defecto en XAMPP
    password: 'Hola12345!',           // Contraseña vacía por defecto en XAMPP (ajusta si has cambiado la contraseña)
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

    // Cierra la conexión después de probar
    db.end((endErr) => {
        if (endErr) {
            console.error('Error cerrando la conexión: ', endErr);
        } else {
            console.log('Conexión cerrada correctamente');
        }
    });
});
