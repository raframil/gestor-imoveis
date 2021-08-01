const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const PropertyController = require("../controllers/property-controller");

router.get("/properties", PropertyController.list);

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
        image: Joi.string().required(),
        date: Joi.date().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  PropertyController.store
);

router.put(
  "/properties/:id",
  celebrate(
    { params: Joi.object().keys({ id: Joi.string() }) },
    {
      body: Joi.object().keys({
        description: Joi.string().optional(),
        sellerName: Joi.string().optional(),
        price: Joi.number().optional(),
        image: Joi.string().optional(),
        date: Joi.date().optional(),
      }),
    }
  ),
  PropertyController.update
);

router.delete(
  "/properties/:id",
  celebrate({ params: Joi.object().keys({ id: Joi.string() }) }),
  PropertyController.delete
);

module.exports = router;
