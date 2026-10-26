const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_logistica', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize