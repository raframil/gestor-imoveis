require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const { errors } = require("celebrate");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ msg: "Ok" });
});

app.use(cors());
app.use(routes);
app.use(errors());

app.listen(port, () =>
  console.log(`Express dev server started on port ${port}`)
);
