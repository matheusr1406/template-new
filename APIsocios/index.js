const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Inicializa o app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); // Encerra o processo em caso de erro crítico
  });

// Importando rotas
const businessRoutes = require("./routes/businessRoutes");
app.use("/businesses", businessRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

// Manipulador global de erros
app.use((err, req, res, next) => {
  console.error("Erro interno:", err.message);
  res.status(500).json({ error: "Ocorreu um erro interno no servidor" });
});

// Configuração de porta para a Vercel
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
