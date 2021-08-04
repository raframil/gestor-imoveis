const Sale = require("../models/sale");
const Property = require("../models/property");
const Professional = require("../models/professional");

module.exports = {
  async list(req, res) {
    try {
      const { income, month, year } = req.query;

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
        })
          .populate("seller")
          .populate("property");
      } else {
        sales = await Sale.find().populate("seller").populate("property");
      }

      if (+income === 1) {
        let totalRevenues = 0;
        let totalComissionPaid = 0;
        let totalSalaryPaid = 0;

        for await (sale of sales) {
          const saleComission =
            (sale.seller.commissionPercentage * sale.salePrice) / 100;

          if (sale.seller.salary) {
            totalSalaryPaid += Number(sale.seller.salary);
          }

          totalComissionPaid += saleComission;
        }

        sales = sales.map((sale) => {
          const profit = sale.salePrice * 0.05;
          totalRevenues += profit;
          return { ...sale.toObject(), profit };
        });

        const totalProfit =
          totalRevenues - (totalComissionPaid + totalSalaryPaid);

        return res.json({
          sales,
          totalRevenues,
          totalComissionPaid,
          totalSalaryPaid,
          totalProfit,
        });
      }

      return res.json(sales);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "SERVER_ERROR", error });
    }
  },

  async store(req, res) {
    try {
      const { propertyId, sellerId, salePrice, saleDate, buyerName } = req.body;

      const property = await Property.findOne({ id: propertyId }).populate(
        "sale"
      );

      if (!property) {
        return res
          .status(404)
          .json({ error: `Property ${propertyId} not found` });
      }

      if (property.sale) {
        return res
          .status(409)
          .json({ error: `Property ${propertyId} already sold` });
      }

      const professional = await Professional.findOne({ _id: sellerId });

      if (!professional) {
        return res
          .status(404)
          .json({ error: `Professional ${sellerId} not found` });
      }

      const sale = await Sale.create({
        salePrice,
        saleDate,
        buyerName,
        property: property._id,
        seller: sellerId,
      });

      await sale.populate("property").populate("seller").execPopulate();

      await Property.updateOne(
        { _id: property._id },
        { $set: { sale: sale._id } }
      );

      return res.json(sale);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
