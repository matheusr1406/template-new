const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  photos: [String], // URLs das fotos
  files: [String], // URLs dos arquivos
  mapLink: { type: String }, // Link do mapa
  participants: [String], // Nomes dos participantes
  authorizedEmails: [String], // Lista de e-mails autorizados
});

module.exports = mongoose.model("Business", BusinessSchema);
