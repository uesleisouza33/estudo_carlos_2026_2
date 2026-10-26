const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')


const Funcionario = sequelize.define('funcionario', {
    codFuncionario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }   
}, {
    tableName: 'funcionarios',
    timestamps: false
})



module.exports = Funcionario