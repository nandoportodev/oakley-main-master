const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Adicionado para hash de senhas
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' })); // Permitir apenas o front-end
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão com o MongoDB
mongoose
  .connect('mongodb+srv://nandocarros:YU1LzkTD6SrFTlLE@oakley.x9y2gw7.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo de Usuário
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

// Criar um usuário inicial para testar
const createInitialUser = async () => {
  try {
    const userExists = await User.findOne({ email: 'admin@example.com' });
    if (!userExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10); // Hash da senha
      const initialUser = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
      });
      await initialUser.save();
      console.log('Usuário inicial criado com sucesso!');
    } else {
      console.log('Usuário inicial já existe.');
    }
  } catch (err) {
    console.error('Erro ao criar usuário inicial:', err);
  }
};

// Rota para cadastrar usuário
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

const momentRoutes = require('./routes/moments'); // Importar as rotas de momentos

// Rotas
app.use('/api/moments', momentRoutes); // Registrar as rotas de momentos

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  createInitialUser();
});