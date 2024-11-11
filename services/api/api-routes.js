const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../../configuration/db");
const { configService } = require("../config/getConfig.service");
const OpenAIClass = require("../../class/OpenAIClass");

router.get("/users", async (req, res) => {
  try {
    const data = await getAllUsers();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/config", async (req, res) => {
  try {
    const config = await configService();
    res.json(config);
  } catch (error) {
    console.log(error);
  }
});

router.post("/ask", async (req, res) => {
  const openaiClient = new OpenAIClass();
  const { prompt } = req.body;
  try {
    const answer = await openaiClient.ask(prompt);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
