const Sequelize = require('sequelize')

module.exports = sequelize.define('product_images', {

  product_img_id: {
    type: Sequelize.INTEGER(20),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  product_img_name: {
    type: Sequelize.STRING(225),
    unique: true
  },
  product_img_path: {
    type: Sequelize.STRING(225),
  },
  product_id: Sequelize.INTEGER(11),
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
})