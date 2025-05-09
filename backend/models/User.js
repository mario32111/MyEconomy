// backend/models/User.js
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      // Datos básicos
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      paternalLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      maternalLastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      // Campo name para compatibilidad con código existente
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.paternalLastName}`;
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
      // Campos de estado
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      
      // Campos para verificación de email
      emailVerificationToken: DataTypes.STRING,
      emailVerificationExpires: DataTypes.DATE,
      
      // Campos para seguridad
      loginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      lockUntil: DataTypes.DATE,
      
      // Campos para recuperación de contraseña
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE,
      
      // Campos para integración con Supabase
      supabaseUserId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
      // Campos financieros
      monthlyIncome: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      currentSavings: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      monthlyExpenses: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      primaryGoal: {
        type: DataTypes.STRING,
        allowNull: true
      },
      timeframe: {
        type: DataTypes.STRING,
        allowNull: true
      },
      savingsGoal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      riskTolerance: {
        type: DataTypes.STRING,
        allowNull: true
      },
      budgetType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      notificationPreference: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      }
    });
  }

  static associate(models) {
    // Definir relaciones con otros modelos
    if (models.Account) {
      this.hasMany(models.Account, { foreignKey: 'userId', as: 'accounts' });
    }
  }

  // Método para validar contraseña
  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }

  // Método para verificar si la cuenta está bloqueada
  isLocked() {
    return this.lockUntil && this.lockUntil > Date.now();
  }

  // Método para incrementar intentos de login
  async incrementLoginAttempts() {
    // Implementar lógica de bloqueo después de ciertos intentos
    const MAX_LOGIN_ATTEMPTS = 5;
    const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 horas en milisegundos

    // Si ya está bloqueado, no hacer nada
    if (this.isLocked()) return;

    // Incrementar intentos
    this.loginAttempts += 1;

    // Verificar si debe ser bloqueado
    if (this.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      this.lockUntil = new Date(Date.now() + LOCK_TIME);
    }

    await this.save();
  }

  // Método para resetear intentos de login
  async resetLoginAttempts() {
    if (this.loginAttempts > 0 || this.lockUntil) {
      this.loginAttempts = 0;
      this.lockUntil = null;
      await this.save();
    }
  }
}

module.exports = User;