const Sale = require("../models/sale");
const Property = require("../models/property");
const Professional = require("../models/professional");

module.exports = {
  async list(req, res) {
    try {
      const sales = await Sale.find();
      return res.json(sales);
    } catch (error) {
      return res.status(500).json({ error: "SERVER_ERROR" });
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
