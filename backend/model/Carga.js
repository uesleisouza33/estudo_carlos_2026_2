const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Carga = sequelize.define('carga', {
    codCarga: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    volume: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    codigoRastreio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codMotorista: {
        type: DataTypes.INTEGER,
        references: {
            model: 'motoristas',
            key: 'codMotorista'
        }
    }
}, {
    tableName: 'cargas',
    timestamps: false
})

module.exports = Carga