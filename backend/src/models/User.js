const Sequelize = require('sequelize')

module.exports = sequelize.define('user',
  {
    user_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    user_lastname: {
      type: Sequelize.STRING(25)
    },
    user_firstname: {
      type: Sequelize.STRING(25)
    },
    user_role: {
      type: Sequelize.STRING(25)
    },
    user_address: {
      type: Sequelize.STRING(25)
    },
    user_birthdate: {
      type: Sequelize.DATE
    },
    user_gender: {
      type: Sequelize.STRING(11)
    },
    user_email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    user_password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_photo: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "default_user.jpg"
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  }
)