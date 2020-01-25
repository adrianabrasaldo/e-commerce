const Sequelize = require('sequelize')

module.exports = sequelize.define('carts', {

  cart_id: {
    type: Sequelize.INTEGER(20),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  cart_timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  cart_quantity: {
    type: Sequelize.DOUBLE,
  },
  cart_price: {
    type: Sequelize.DOUBLE,
  },
  transaction_id: {
    type: Sequelize.INTEGER,
  },
  product_id: {
    type: Sequelize.INTEGER
  }
}, 
{
  timestamps: false
})