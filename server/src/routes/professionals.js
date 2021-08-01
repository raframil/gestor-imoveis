const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const ProfessionalController = require("../controllers/professional-controller");

router.get("/professionals", ProfessionalController.list);

router.post(
  "/professionals",
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        creci: Joi.string().required(),
        type: Joi.string().required().valid("Contratado", "Comissionado"),
        salary: Joi.number().optional(),
        commissionPercentage: Joi.number().optional(),
        admissionDate: Joi.date().optional(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  ProfessionalController.store
);

router.put(
  "/professionals/:id",
  celebrate(
    { params: Joi.object().keys({ id: Joi.string() }) },
    {
      body: Joi.object().keys({
        salary: Joi.number().optional(),
        commissionPercentage: Joi.number().optional(),
      }),
    }
  ),
  ProfessionalController.update
);

router.delete(
  "/professionals/:id",
  celebrate({ params: Joi.object().keys({ id: Joi.string() }) }),
  ProfessionalController.delete
);

module.exports = router;
