const express = require("express");
const router = express.Router();
const propertiesRoutes = require("./properties");
const professionalRoutes = require("./professionals");

router.use(propertiesRoutes);
router.use(professionalRoutes);

module.exports = router;
