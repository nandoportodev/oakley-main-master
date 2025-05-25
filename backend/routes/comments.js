const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Moment = require('../models/Moment');

// Rota para adicionar um novo comentário a um momento
router.post('/:momentId/comments', async (req, res) => {
  try {
    const { momentId } = req.params;
    const { text, username } = req.body;

    // Verifica se o momento existe
    const moment = await Moment.findById(momentId);
    if (!moment) {
      return res.status(404).json({ error: 'Momento não encontrado.' });
    }

    // Cria o novo comentário
    const newComment = new Comment({ text, username, momentId });
    await newComment.save();

    // Adiciona o comentário ao momento (opcional, mas pode ser útil para exibição rápida)
    moment.comments.push(newComment);
    await moment.save();

    res.status(201).json({ message: 'Comentário adicionado com sucesso!', comment: newComment });
  } catch (err) {
    console.error('Erro ao adicionar comentário:', err);
    res.status(500).json({ error: 'Erro interno ao adicionar comentário.' });
  }
});

// Rota para buscar todos os comentários de um momento específico
router.get('/:momentId/comments', async (req, res) => {
  try {
    const { momentId } = req.params;

    // Verifica se o momento existe
    const moment = await Moment.findById(momentId);
    if (!moment) {
      return res.status(404).json({ error: 'Momento não encontrado.' });
    }

    // Busca os comentários associados ao momento
    const comments = await Comment.find({ momentId }).sort({ created_at: -1 });
    res.status(200).json({ data: comments });
  } catch (err) {
    console.error('Erro ao buscar comentários:', err);
    res.status(500).json({ error: 'Erro ao buscar comentários.' });
  }
});

// Rota para remover um comentário
router.delete('/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    // Verifica se o comentário existe
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comentário não encontrado.' });
    }

    res.status(200).json({ message: 'Comentário removido com sucesso!' });
  } catch (err) {
    console.error('Erro ao remover comentário:', err);
    res.status(500).json({ error: 'Erro interno ao remover comentário.' });
  }
});

module.exports = router;
