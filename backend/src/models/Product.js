const Sequelize = require('sequelize')

module.exports = sequelize.define('products', {

  product_id: {
    type: Sequelize.INTEGER(20),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  product_name: {
    type: Sequelize.STRING(225),
    allowNull: false,
    unique: true
  },
  product_brand: {
    type: Sequelize.STRING(225),
  },
  product_description: {
    type: Sequelize.STRING(225),
  },
  product_price: {
    type: Sequelize.DOUBLE(225),
  },  
  product_quantity: {
    type: Sequelize.INTEGER(225),
  },  
  sub_category_id: Sequelize.INTEGER(11),
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
})