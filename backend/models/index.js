const { Sequelize } = require('sequelize');
const config = require('../config/database');
const User = require('./User');
const Account = require('./account');
const Transaction = require('./transaction');
const Category = require('./category');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Verificar que dbConfig existe
if (!dbConfig) {
  throw new Error(`La configuración de la base de datos para el entorno "${env}" no existe`);
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: false
  }
);

// Inicializar modelos
const models = {
  User,
  Account,
  Transaction,
  Category
};

// Inicializar cada modelo
Object.values(models).forEach(model => {
  if (typeof model.init === 'function') {
    model.init(sequelize);
  }
});

// Definir asociaciones
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  Sequelize,
  ...models
};