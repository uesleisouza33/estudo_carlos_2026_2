const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Entrega = sequelize.define('entrega', {
    codEntrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ENTREGUE', 'TRANSITO'),
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    codCarga: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cargas',
            key: 'codCarga'
        }
    }
}, {
    tableName: 'entregas',
    timestamps: false
})

module.exports = Entrega