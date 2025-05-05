require('dotenv').config();
const { Sequelize } = require('sequelize');

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

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    
    console.log('Información de conexión:');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Puerto: ${process.env.DB_PORT}`);
    console.log(`Base de datos: ${process.env.DB_NAME}`);
    console.log(`Usuario: ${process.env.DB_USER}`);
    console.log(`SSL: ${process.env.DB_SSL}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

testConnection();