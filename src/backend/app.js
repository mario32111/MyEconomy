const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Asegúrate de que este archivo exista

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes en formato JSON

// Rutas
app.get('/', (req, res) => {
    res.send('API en funcionamiento');
});

// Usa las rutas definidas para los usuarios
app.use('/api/users', userRoutes); // Aquí se integran las rutas de usuarios

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
