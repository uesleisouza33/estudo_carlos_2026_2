const Carga = require('../model/Carga')

const cadastrar = async (req,res) => {
    const valores = req.body

    try {
        if(!valores){
            return res.status(404).json({message: 'Preencha os campos corretamente'})
        }

        await Carga.create(valores)

        return res.stauts(201).json({message: 'Cadastro realizado com sucesso'})
    } catch (error) {
        console.error('Erro ao cadastrar carga', error)
        res.status(500).json({message: 'Erro ao cadastrar carga'})
    }
}

module.exports = {cadastrar}