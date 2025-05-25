const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true }, 
  username: { type: String, required: true },
  momentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Moment', 
    required: true 
  },
  created_at: { type: Date, default: Date.now }, // Data de criação
});

// Cria e exporta o modelo de Comentário
module.exports = mongoose.model('Comment', CommentSchema);
