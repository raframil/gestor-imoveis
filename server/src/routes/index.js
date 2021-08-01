const express = require("express");
const router = express.Router();
const propertiesRoutes = require("./properties");

router.use(propertiesRoutes);

module.exports = router;
