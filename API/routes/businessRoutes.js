const express = require("express");
const Business = require("../models/Business");

const router = express.Router();

// Rota para buscar negócios autorizados
router.get("/", async (req, res) => {
  const { email } = req.query;

  try {
    const businesses = await Business.find({ authorizedEmails: email });
    res.json(businesses);
  } catch (error) {
    console.error("Erro ao buscar negócios:", error);
    res.status(500).json({ error: "Erro ao buscar negócios" });
  }
});

// Rota para adicionar um novo negócio
router.post("/", async (req, res) => {
  const { name, description, photos, files, mapLink, participants, authorizedEmails } = req.body;

  try {
    const newBusiness = new Business({
      name,
      description,
      photos,
      files,
      mapLink,
      participants,
      authorizedEmails,
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    console.error("Erro ao criar negócio:", error);
    res.status(500).json({ error: "Erro ao criar negócio" });
  }
});

module.exports = router;
