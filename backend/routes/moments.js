const express = require('express');
const router = express.Router();
const multer = require('multer');
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

router.get('/', async (req, res) => {
  try {
    const moments = await Moment.find().sort({ created_at: -1 }); // Ordena por data de criação
    res.status(200).json({ data: moments });
  } catch (err) {
    console.error('Erro ao buscar momentos:', err);
    res.status(500).json({ error: 'Erro ao buscar momentos.' });
  }
});

module.exports = router;