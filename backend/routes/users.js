const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    // Verificar se o e-mail já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já está em uso.' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;