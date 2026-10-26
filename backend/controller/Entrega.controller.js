const Entrega = require('../model/Entrega')

const cadastrar = async (req,res) => {
    const valores = req.body

    try {
        if(!valores){
            return res.status(404).json({message: 'Preencha os campos corretamente'})
        }

        await Entrega.create(valores)

        return res.stauts(201).json({message: 'Cadastro realizado com sucesso'})
    } catch (error) {
        console.error('Erro ao cadastrar entrega', error)
        res.status(500).json({message: 'Erro ao cadastrar entrega'})
    }
}

module.exports = {cadastrar}