const professional = require("../models/professional");
const Professional = require("../models/professional");
const Sale = require("../models/sale");

module.exports = {
  async list(req, res) {
    try {
      const { income, month, year } = req.query;

      let professionals = await Professional.find();

      if (+income === 1) {
        let sales = [];

        if (month && year) {
          sales = await Sale.find({
            $expr: {
              $and: [
                {
                  $eq: [
                    {
                      $month: "$saleDate",
                    },
                    +month,
                  ],
                },
                {
                  $eq: [
                    {
                      $year: "$saleDate",
                    },
                    +year,
                  ],
                },
              ],
            },
          });
        } else {
          sales = await Sale.find();
        }

        professionals = professionals.map((professional) => {
          let professionalSales = sales.filter((sale) => {
            return sale.seller.equals(professional._id);
          });

          professionalSales = professionalSales.map((sale) => {
            const saleComission =
              (professional.commissionPercentage * sale.salePrice) / 100;

            return { ...sale.toObject(), saleComission };
          });

          let calculatedIncome = 0;
          let comissionSum = 0;
          for (const sale of professionalSales) {
            calculatedIncome +=
              Number(sale.salePrice) - Number(sale.saleComission);

            comissionSum += Number(sale.saleComission);
          }

          const serialized = {
            ...professional.toObject(),
            professionalSales,
            calculatedIncome,
            comissionSum,
          };

          return serialized;
        });

        let highestCommissionValue = 0;
        let highestComissionProfessional = null;
        for await (const professional of professionals) {
          if (professional.comissionSum > highestCommissionValue) {
            highestCommissionValue = professional.comissionSum;
            highestComissionProfessional = professional;
          }
        }

        return res.json({
          professionals,
          highestCommissionValue,
          highestComissionProfessional,
        });
      }

      return res.json(professionals);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "SERVER_ERROR" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const { month, year } = req.query;
      const professional = await Professional.findOne({ _id: id });

      if (!professional) {
        return res.status(404).json({ error: `Professional ${id} not found` });
      }

      let sales = [];

      if (month && year) {
        sales = await Sale.find({
          $expr: {
            $and: [
              {
                $eq: [
                  {
                    $month: "$saleDate",
                  },
                  +month,
                ],
              },
              {
                $eq: [
                  {
                    $year: "$saleDate",
                  },
                  +year,
                ],
              },
            ],
          },
        });
      } else {
        sales = await Sale.find();
      }

      let professionalSales = sales.filter((sale) => {
        return sale.seller.equals(professional._id);
      });

      let totalSalary = 0;
      if (professional.type === "Contratado") {
        totalSalary += Number(professional.salary);

        professionalSales = professionalSales.map((sale) => {
          const saleComission =
            (professional.commissionPercentage * sale.salePrice) / 100;

          totalSalary += saleComission;
          return { ...sale.toObject(), saleComission };
        });
      }

      if (professional.type === "Comissionado") {
        professionalSales = professionalSales.map((sale) => {
          const saleComission =
            (professional.commissionPercentage * sale.salePrice) / 100;

          totalSalary += saleComission;
          return { ...sale.toObject(), saleComission };
        });
      }

      return res.json({ professional, professionalSales, totalSalary });
    } catch (error) {
      return res.status(500).json(error);
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

      await Professional.deleteOne({ _id: id });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "SERVER_ERROR" });
    }
  },
};
