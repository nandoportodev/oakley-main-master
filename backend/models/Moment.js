const mongoose = require('mongoose');

const MomentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Caminho ou URL da imagem
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Moment', MomentSchema);