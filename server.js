const express = require('express')
const app = express()
const router = require('./routes')
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Drigo here🙌" });
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = app;