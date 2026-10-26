const {Motorista, Carga, Entrega, Funcionario } = require('./model/rel')
const sequelize = require('./db/db')

const sync = async ()=>{
    try {
        await sequelize.sync({force: true})
        console.log("Sincronizando tabelas");
    } catch (error) {
        console.error('Erro ao sincronizar tabelas', error)
    }
    finally{
        await sequelize.close()
    }
}

sync();