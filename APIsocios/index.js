const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro ao conectar ao MongoDB"));
db.once("open", () => {
  console.log("Conectado ao MongoDB!");
});

// Importando rotas
const businessRoutes = require("./routes/businessRoutes");
app.use("/businesses", businessRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

// Exporta o app para que a Vercel possa usá-lo
module.exports = app;

// Configuração de porta para o Vercel
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
