const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const SaleController = require("../controllers/sale-controller");

router.post(
  "/sales",
  celebrate(
    {
      body: Joi.object().keys({
        salePrice: Joi.number().required(),
        saleDate: Joi.date().required(),
        buyerName: Joi.string().required(),
        sellerId: Joi.string().required(),
        propertyId: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  SaleController.store
);

module.exports = router;
