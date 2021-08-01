const Sale = require("../models/sale");

module.exports = {
  async list(req, res) {},

  async store(req, res) {
    try {
      const { propertyId, sellerId, salePrice, saleDate, buyerName } = req.body;

      const sale = await Sale.create({
        salePrice,
        saleDate,
        buyerName,
        property: propertyId,
        seller: sellerId,
      });

      return res.json(sale);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async update(req, res) {},

  async delete(req, res) {},
};
