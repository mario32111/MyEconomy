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
      name: {
        type: DataTypes.STRING,
        allowNull: false
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      emailVerificationToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emailVerificationExpires: {
        type: DataTypes.DATE,
        allowNull: true
      },
      // Campos para control de intentos de login
      loginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      lockUntil: {
        type: DataTypes.DATE,
        allowNull: true
      },
      // Campos del perfil financiero
      monthlyIncome: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: true
      },
      currentSavings: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: true
      },
      monthlyExpenses: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: true
      },
      // Campos de objetivos
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
        defaultValue: 0,
        allowNull: true
      },
      // Campos de preferencias
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
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    });
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  isLocked() {
    return this.lockUntil && new Date(this.lockUntil) > new Date();
  }

  async incrementLoginAttempts() {
    this.loginAttempts = (this.loginAttempts || 0) + 1;
    
    // Si excede el máximo de intentos, bloquear la cuenta
    if (this.loginAttempts >= 5) {
      this.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos
    }
    
    await this.save();
  }

  async resetLoginAttempts() {
    this.loginAttempts = 0;
    this.lockUntil = null;
    await this.save();
  }
}

module.exports = User;