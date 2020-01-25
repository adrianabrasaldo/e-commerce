'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};
