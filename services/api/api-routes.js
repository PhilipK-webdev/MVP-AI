const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  updateUser,
  getUser,
} = require("../../configuration/db");
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

router.post("/add", async (req, res) => {
  try {
    const { data } = req.body;
    const result = await addUser(data);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", async (req, res) => {
  try {
    const { data } = req.body;
    const result = await updateUser(data);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/user", async (req, res) => {
  try {
    const userId = req.query;
    const data = await getUser(userId);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
