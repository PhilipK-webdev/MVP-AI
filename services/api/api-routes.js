const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  updateUser,
  getUser,
  getMessages,
  setConversation,
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
  const { prompt, userUUID, messageUUID } = req.body;
  try {
    const answer = await openaiClient.ask(prompt, userUUID, messageUUID);
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

router.get("/message", async (req, res) => {
  try {
    const { userKey, messageKey } = req.query;
    const data = await getMessages(userKey, messageKey);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-conversation", async (req, res) => {
  try {
    const { uuid, title } = req.body;
    const result = await setConversation(uuid, title);
    res.json(result);
  } catch (error) {}
});

module.exports = router;
