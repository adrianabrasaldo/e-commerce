const Sequelize = require('sequelize')

const sequelize = new Sequelize('e_commerce', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

// db.sequelize = sequelize
// db.Sequelize = Sequelize

module.exports = sequelize;
global.sequelize = sequelize;