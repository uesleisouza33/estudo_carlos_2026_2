const express = require('express');
const cors = require('cors');
const sequelize = require('./db/db');
require('./model/rel');

const AuthController = require('./controller/auth.controller');
const CargaController = require('./controller/Carga.controller');
const EntregaController = require('./controller/Entrega.controller');
const FuncionarioController = require('./controller/Funcionario.controller');
const MotoristaController = require('./controller/Motorista.controller');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API da Logística Express funcionando!',
    status: 'online'
  });
});

app.post('/login', AuthController.login);

app.post('/funcionario', FuncionarioController.cadastrar);
app.post('/carga', CargaController.cadastrar);
app.post('/entrega', EntregaController.cadastrar);
app.post('/motorista', MotoristaController.cadastrar);

app.get('/motorista', MotoristaController.listar);
app.get('/motorista/:id', MotoristaController.consultar);
app.get('/motorista/nome/:nome', MotoristaController.consultarNome);
app.put('/motorista/:id', MotoristaController.atualizar);
app.delete('/motorista/:id', MotoristaController.apagar);

app.use((err, req, res, next) => {
  console.error('Erro interno:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com o banco.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
