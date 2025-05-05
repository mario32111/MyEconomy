const { User } = require('../models');
require('dotenv').config();

async function createTestUser() {
  try {
    const user = await User.create({
      name: 'Usuario Prueba',
      email: 'test@example.com',
      password: '123456'
    });
    
    console.log('✅ Usuario creado:', user.toJSON());
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
  } finally {
    process.exit();
  }
}

createTestUser();