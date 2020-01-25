const Sequelize = require('sequelize')

module.exports = sequelize.define('transactions', {

  transaction_id: {
    type: Sequelize.INTEGER(20),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  transaction_timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  transaction_total: {
    type: Sequelize.DOUBLE,
  },
  transaction_tendered: {
    type: Sequelize.DOUBLE,
  },
  transaction_change: {
    type: Sequelize.DOUBLE,
  },
  transaction_method: {
    type: Sequelize.STRING,
  },
  transaction_status: {
    type: Sequelize.STRING,
  },
  user_id: {
    type: Sequelize.INTEGER
  }
}, 
{
  timestamps: false
})