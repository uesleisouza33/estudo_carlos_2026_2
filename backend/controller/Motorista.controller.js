const Motorista = require('../model/Motorista')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'abu'

const cadastrar = async (req, res) => {
    try {
        const valores = req.body

        if (!valores.nome || !valores.cnh, !valores.cpf || !valores.telefone) {
            res.status(400).json({ message: 'Preencha os campos corretamente' })
        }

        const cnhCripto = CryptoJS.AES.encrypt(valores.cnh, CHAVE_SECRETA)
        const cpfCripto = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA)

        const valores2 = {
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        }

        await Motorista.create(valores2)
        return res.status(200).json({ message: 'Motorista criado com sucesso' })
    } catch (error) {
        console.error('Erro ao cadastrar motorista: ', error)
        return res.status(500).json({ message: 'Erro ao cadastrar motorista' })
    }
}

const listar = async (req, res) => {
    try {
        const motoristas = await Motorista.findAll()
        let resultado = []

        motoristas.forEach((el) => {
            let cpfDescripto = ''
            let cnhDescripto = ''
            try {
                const bytesCpf = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescripto = bytesCpf.toString(CryptoJS.enc.Utf8)
                const bytesCnh = CryptoJS.AES.decrypt(el.cnh, CHAVE_SECRETA)
                cnhDescripto = bytesCnh.toString(CryptoJS.enc.Utf8)
            } catch (error) {
                cpfDescripto = 'Erro ao descriptografar'
                console.error(cpfDescripto, error);
                cnhDescripto = 'Erro ao descriptografar'
                console.error(cnhDescripto, error);
            }
            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                cnh: cnhDescripto,
                cpf: cpfDescripto,
                telefone: el.telefone
            })
        })

        return res.status(200).json(resultado)
    } catch (error) {
        console.error('Erro ao listar motoristas', error)
        return res.status(500).json({ message: 'Erro ao listar funcionários' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const motorista = await Motorista.findByPk(id)
        if (!ciclista) {
            return res.status(400).json({ message: 'Motorista não encontrado' })
        }

        const cpfDescripto = ''
        const cnhDescripto = ''

        const bytesCpf = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
        cpfDescripto = bytesCpf.toString(CryptoJS.enc.Utf8)
        const bytesCnh = CryptoJS.AES.decrypt(el.cnh, CHAVE_SECRETA)
        cnhDescripto = bytesCnh.toString(CryptoJS.enc.Utf8)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescripto,
            cpf: cpfDescripto,
            telefone: motorista.telefone

        })

    } catch (error) {
        console.error('Erro ao consultar motorista', error)
        return res.status(500).json({ message: 'Erro ao consultar motorista' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) { return res.status(404).json({ message: 'Motorista não encontrado' }) }

        const dadosAtualizados = { ...valores }

        if (valores.cpf) {
            if (valores.cpf.length !== 11) {
                return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
            }
            dadosAtualizados.cpf = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        }

        await Motorista.update(dadosAtualizados, { where: { codMotorista: id } })
        return res.status(200).json({ message: 'Motorista atualizado com sucesso' })
    } catch (error) {
        console.error('Erro ao atualizar motorista', error)
        return res.status(500).json({ message: 'Erro ao atualizar ciclista' })
    }
}


const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const motorista = Motorista.findByPk(id)
        if (!motorista) { return res.status(404).json({ message: "Motorista não encontrado" }) }

        await Motorista.destroy({ where: { codMotorista: id } })
        return res.status(200).json({ message: 'Ciclista exclúido com sucesso' })
    } catch (error) {
        console.error('Erro ao apgar motorista: ', error)
        return res.status(500).json({ message: 'Erro ao apagar motorista' })
    }
}

const consultarNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const motorista = await Motorista.findOne({ where: { nome: nome } })

        if (!motorista) {
            return res.status(404).json({ message: 'Nenhum motorista encontrado' })
        }

        const cpfDescripto = ''
        const cnhDescripto = ''

        const bytesCpf = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
        cpfDescripto = bytesCpf.toString(CryptoJS.enc.Utf8)
        const bytesCnh = CryptoJS.AES.decrypt(el.cnh, CHAVE_SECRETA)
        cnhDescripto = bytesCnh.toString(CryptoJS.enc.Utf8)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescripto,
            cpf: cpfDescripto,
            telefone: motorista.telefone

        })
    } catch (error) {
        console.error('Erro ao consultar por nome: ', error)
        return res.status(500).json({ message: 'Erro ao consultar por nome: ', error })
    }
}
module.exports = { cadastrar, listar, consultar, atualizar, apagar, consultarNome}