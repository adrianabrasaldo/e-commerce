'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sub_categories', {
      sub_category_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      sub_category_name: {
        type: Sequelize.STRING(20),
        unique: true
      },
      category_id: Sequelize.INTEGER(11),
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sub_categories')
  }
};
