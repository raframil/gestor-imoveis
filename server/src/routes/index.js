const express = require("express");
const router = express.Router();
const propertiesRoutes = require("./properties");
const professionalRoutes = require("./professionals");
const salesRoutes = require("./sales");

router.use(propertiesRoutes);
router.use(professionalRoutes);
router.use(salesRoutes);

module.exports = router;
