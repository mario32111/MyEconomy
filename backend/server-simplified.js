const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// Cargar variables de entorno
dotenv.config();

// Configurar conexión a la base de datos directamente para depuración
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    logging: console.log
  }
);

const app = express();

const debugMiddleware = (req, res, next) => {
    console.log('\n--- SOLICITUD RECIBIDA ---');
    console.log('URL:', req.originalUrl);
    console.log('Método:', req.method);
    console.log('Headers:', req.headers);
    console.log('Cuerpo:', req.body);
    console.log('------------------------\n');
    next();
  };
  app.use(cors());
app.use(express.json());
app.use(debugMiddleware);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando' });
});

const PORT = process.env.PORT || 5000;

// Iniciar servidor sin cargar modelos para depuración
const startServer = async () => {
  try {
    // Probar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida');
    
    // Mostrar información de la conexión
    console.log('Información de conexión:');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Puerto: ${process.env.DB_PORT}`);
    console.log(`Base de datos: ${process.env.DB_NAME}`);
    console.log(`Usuario: ${process.env.DB_USER}`);
    console.log(`SSL: ${process.env.DB_SSL}`);

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    console.error('Detalles del error:', error.message);
    if (error.parent) {
      console.error('Error padre:', error.parent.message);
    }
    process.exit(1);
  }
};
// Add this to server-simplified.js
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
startServer();