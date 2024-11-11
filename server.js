// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./services/api/api-routes.js");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
