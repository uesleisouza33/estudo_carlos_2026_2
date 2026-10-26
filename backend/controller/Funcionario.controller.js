const Funcionario = require('../model/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'abu'

const cadastrar = async (req, res) => {
    try {
        const valores = req.body

        if (!valores.nome || !valores.email || !valores.senha) {
            return res.status(400).json({ message: 'Preencha todos campos corretamente' })
        }

        const senhaCripto = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA)

        const valores2 = {
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto
        }

        await Funcionario.create(valores2)
        return res.status(201).json({ message: 'Funcionário cadastrado com sucesso' })

    } catch (error) {
        console.error('Erro ao cadastrar: ', error)
        return res.status(500).json({ message: 'Erro ao cadastrar' })
    }
}

module.exports = { cadastrar }