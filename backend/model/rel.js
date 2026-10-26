const Carga = require('./Carga')
const Entrega = require('./Entrega')
const Funcionario = require('./Funcionario')
const Motorista = require('./Motorista')

Motorista.hasMany(Carga, {
    foreignKey: 'codMotorista',
    as: 'motoristaCarga',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Motorista, {
    foreignKey: 'codMotorista',
    as: 'cargaMotorista',
    allowNull: false
})

Carga.hasMany(Entrega, {
    foreignKey: 'codCarga',
    as: 'cargaEntrega',
    onDelete: 'CASCADE'
})

Entrega.belongsTo(Carga, {
    foreignKey: 'codCarga',
    as: 'entregaCarga',
    allowNull: false
})

module.exports = { Motorista, Carga, Entrega, Funcionario }