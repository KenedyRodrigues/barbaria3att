const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Importando o CORS
const bcrypt = require('bcrypt'); // Importando bcrypt para criptografar as senhas
const app = express();
const PORT = 5001;

// Configurando o CORS para permitir requisições de qualquer origem
app.use(cors()); // Permite todas as origens
app.use(bodyParser.json());

// Configurando a conexão com o MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Substitua pelo seu usuário MySQL
  password: '12345678', // Substitua pela sua senha MySQL
  database: 'agendamentosdb', // Banco de dados que criamos
  port: 3306
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
  
});




app.post('/api/agendar', async (req, res) => {
    const { nome, telefone, barbeiro, servicoSelecionado, dataMarcado, hora } = req.body;
  
    try {
      
  
      // Inserir dados na tabela de usuarios
      const query = 'INSERT INTO agendamentos (nome, telefone, barbeiro, servicoSelecionado, dataMarcado, hora) VALUES (?, ?, ?, ?, ?, ?)';
      
      db.execute(query, [nome, telefone, barbeiro, servicoSelecionado, dataMarcado, hora], (err, results) => {
        if (err) {
          console.error('Erro ao salvar o usuário:', err);
          return res.status(500).json({ message: 'Erro ao salvar o usuário' });
        }
  
        // Retorna a resposta após salvar o usuário com sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso!', id: results.insertId });
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
  });


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://192.168.15.143:${PORT}`);
});