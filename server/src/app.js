require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const { errors } = require("celebrate");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ msg: "ok" });
});

app.use(routes);
app.use(errors());

module.exports = app;
