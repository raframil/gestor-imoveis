const Professional = require("../models/professional");

module.exports = {
  async list(req, res) {
    try {
      const professionals = await Professional.find();
      return res.json(professionals);
    } catch (error) {
      return res.status(500).json({ error: "SERVER_ERROR" });
    }
  },

  async store(req, res) {
    try {
      const { name, creci, type, salary, admissionDate, commissionPercentage } =
        req.body;

      let professional = await Professional.findOne({ creci });

      if (!professional) {
        let comission = 1.0;

        if (type === "Comissionado") {
          comission = commissionPercentage;
        }

        professional = await Professional.create({
          name,
          creci,
          type,
          salary,
          admissionDate,
          commissionPercentage: comission,
        });

        return res.status(201).json(professional);
      }

      return res.status(409).json(professional);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { salary, commissionPercentage } = req.body;

      let professional = await Professional.findOne({ _id: id });

      if (!professional) {
        return res.status(404).json({ error: `Professional ${id} not found` });
      }

      if (professional.type === "Contratado") {
        await Professional.updateOne(
          { _id: id },
          { $set: { salary } },
          { omitUndefined: true }
        );
      }

      if (professional.type === "Comissionado") {
        await Professional.updateOne(
          { _id: id },
          { $set: { commissionPercentage } },
          { omitUndefined: true }
        );
      }

      const updated = await Professional.findOne({ _id: id });
      return res.json(updated);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "SERVER_ERROR" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      let professional = await Professional.findOne({ _id: id });

      if (!professional) {
        return res.status(404).json({ error: `Professional ${id} not found` });
      }

      await Professional.deleteOne({ id });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "SERVER_ERROR" });
    }
  },
};
