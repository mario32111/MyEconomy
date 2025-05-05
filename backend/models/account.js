const { Model, DataTypes } = require('sequelize');

class Account extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('CHECKING', 'SAVINGS', 'CREDIT', 'INVESTMENT'),
        allowNull: false
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'MXN'
      }
    }, {
      sequelize,
      modelName: 'Account',
      tableName: 'accounts'
    });
  }

  static associate(models) {
    Account.belongsTo(models.User, { foreignKey: 'userId' });
    Account.hasMany(models.Transaction, { foreignKey: 'accountId' });
  }
}

module.exports = Account;