const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Moment = require('../models/Moment');

// Configurar o destino dos uploads
const upload = multer({ dest: 'uploads/' });

// Rota para criar um novo momento com upload de imagem
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null; // Nome do arquivo salvo

    if (!title || !description) {
      return res.status(400).json({ error: 'Título e descrição são obrigatórios!' });
    }

    const newMoment = new Moment({ title, description, image });
    await newMoment.save();

    res.status(201).json({ message: 'Momento criado com sucesso!', moment: newMoment });
  } catch (err) {
    console.error('Erro ao criar momento:', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Rota para buscar todos os momentos
router.get('/', async (req, res) => {
  try {
    const moments = await Moment.find().sort({ created_at: -1 }); // Ordena por data de criação
    res.status(200).json({ data: moments });
  } catch (err) {
    console.error('Erro ao buscar momentos:', err);
    res.status(500).json({ error: 'Erro ao buscar momentos.' });
  }
});

// Rota para buscar um momento específico pelo ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const moment = await Moment.findById(id);
    if (!moment) {
      return res.status(404).json({ error: 'Momento não encontrado.' });
    }

    res.status(200).json({ data: moment });
  } catch (err) {
    console.error('Erro ao buscar momento:', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Rota para deletar um momento pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const moment = await Moment.findByIdAndDelete(id);
    if (!moment) {
      return res.status(404).json({ error: 'Momento não encontrado.' });
    }

    res.status(200).json({ message: 'Momento removido com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar momento:', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const moment = await Moment.findById(id);
    if (!moment) {
      return res.status(404).json({ error: 'Momento não encontrado.' });
    }

    // Atualiza os campos (apenas se vierem)
    if (title) moment.title = title;
    if (description) moment.description = description;
    if (image) moment.image = image;

    await moment.save();

    res.status(200).json({ message: 'Momento atualizado com sucesso!', data: moment });
  } catch (err) {
    console.error('Erro ao atualizar momento:', err);
    res.status(500).json({ error: 'Erro ao atualizar momento.' });
  }
});

module.exports = router;