require('dotenv').config(); // Carga variables de entorno desde .env al inicio
const express = require('express');
const cors = require('cors'); // Para permitir peticiones desde tu frontend React
const db = require('./models'); // Importa la configuración de Sequelize y los modelos
const authRoutes = require('./routes/authRoutes'); // Rutas para registro y login
const accountRoutes = require('./routes/accountRoutes'); // Importaremos estas rutas nuevas
// const transactionRoutes = require('./routes/transactionRoutes'); // Futuras rutas
// const budgetRoutes = require('./routes/budgetRoutes');       // Futuras rutas
// const categoryRoutes = require('./routes/categoryRoutes');   // Futuras rutas

const app = express();

// --- Middleware Esencial ---
// 1. CORS: Permite peticiones desde el origen de tu frontend
//    Ajusta 'origin' si tu frontend corre en un puerto diferente o en producción
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// 2. Body Parsers: Para poder leer JSON y datos de formularios en req.body
app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true })); // Para parsear application/x-www-form-urlencoded

// --- Rutas de la API ---
// Rutas públicas (no requieren autenticación generalmente)
app.use('/api/auth', authRoutes);

// Rutas protegidas (requerirán autenticación - aplicaremos 'protect' dentro de sus archivos)
app.use('/api/accounts', accountRoutes); // Registra las rutas para manejar cuentas
// app.use('/api/transactions', transactionRoutes); // Registrarás estas después
// app.use('/api/budgets', budgetRoutes);           // Registrarás estas después
// app.use('/api/categories', categoryRoutes);       // Registrarás estas después

// --- Ruta de Bienvenida/Test (Opcional) ---
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de MyEconomy!');
});

// --- Middleware de Manejo de Errores (Básico) ---
// Colócalo después de todas las rutas
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Ocurrió un error en el servidor.',
    // Considera no enviar el stack en producción por seguridad
    // error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// --- Conexión a Base de Datos y Arranque del Servidor ---
const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    // FORZAR sincronización: BORRA las tablas existentes y las recrea.
    // ¡¡¡PELIGRO!!! SOLO USAR EN DESARROLLO SI NO IMPORTAN LOS DATOS ACTUALES.
    console.log('FORZANDO sincronización de modelos con la base de datos (force: true)...');
    return db.sequelize.sync({ force: true }); // <-- ¡CAMBIO A force: true!
  })
  .then(() => {
    console.log('Modelos sincronizados (forzado) correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error durante la inicialización (force sync):', err);
    process.exit(1);
  });