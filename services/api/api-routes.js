const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../../dbHelper/db");
const { configService } = require("../config/getConfig.service");

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

module.exports = router;
