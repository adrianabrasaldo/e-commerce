const Sequelize = require('sequelize')

module.exports = sequelize.define('category', {

  category_id: {
    type: Sequelize.INTEGER(20),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  category_name: {
    type: Sequelize.STRING(20),
    unique: true
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
})