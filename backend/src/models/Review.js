const Sequelize = require('sequelize')

module.exports = sequelize.define('reviews', {

  review_id: {
    type: Sequelize.INTEGER(20),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  review_rating: {
    type: Sequelize.INTEGER(11)
  },
  review_comment: {
    type: Sequelize.STRING(225),
  },
  review_timestamp: Sequelize.DATE,
  product_id: Sequelize.INTEGER(11),
  account_id: Sequelize.INTEGER(11),
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
})