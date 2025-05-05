const { Model, DataTypes } = require('sequelize');

class Transaction extends Model {
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
      accountId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      type: {
        type: DataTypes.ENUM('INCOME', 'EXPENSE', 'TRANSFER'),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      description: DataTypes.STRING,
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions'
    });
  }

  static associate(models) {
    Transaction.belongsTo(models.User, { foreignKey: 'userId' });
    Transaction.belongsTo(models.Account, { foreignKey: 'accountId' });
    if (models.Category) {
      Transaction.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
}

module.exports = Transaction;