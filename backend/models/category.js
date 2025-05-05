const { Model, DataTypes } = require('sequelize');

class Category extends Model {
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
      type: {
        type: DataTypes.ENUM('INCOME', 'EXPENSE'),
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: '#000000'
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Category',
      tableName: 'categories'
    });
  }

  static associate(models) {
    Category.hasMany(models.Transaction, { foreignKey: 'categoryId' });
    Category.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

module.exports = Category;