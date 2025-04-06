const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB
mongoose
  .connect('mongodb+srv://nandocarros:YU1LzkTD6SrFTlLE@oakley.x9y2gw7.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo de Usuário
const User = require('./models/User');

// Criar usuário inicial
const createInitialUser = async () => {
  try {
    const userExists = await User.findOne({ email: 'admin@example.com' });
    if (!userExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
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

// Rotas
const momentRoutes = require('./routes/moments');
const userRoutes = require('./routes/users');

app.use('/api/moments', momentRoutes);
app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  createInitialUser();
});
