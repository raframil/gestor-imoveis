const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const PropertyController = require("../controllers/property-controller");

/**
 *  @summary CREATE A PROPERTY
 *  @route   POST /properties
 *  @access  Public
 *  @header  { Content-Type: application/json }
 *  @body    { "data": String }
 */
router.post(
  "/properties",
  celebrate(
    {
      body: Joi.object().keys({
        id: Joi.string().required(),
        type: Joi.string()
          .required()
          .valid(
            "Casa",
            "Apartamento",
            "Sala comercial",
            "Lote",
            "Chácara",
            "Sítio",
            "Fazenda"
          ),
        description: Joi.string().required(),
        sellerName: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().optional(),
        date: Joi.date().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  PropertyController.store
);

module.exports = router;
