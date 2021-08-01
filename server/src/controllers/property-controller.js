const Property = require("../models/property");

module.exports = {
  async store(req, res) {
    try {
      const { id, type, description, sellerName, price, image, date } =
        req.body;

      let property = await Property.findOne({ id });

      if (!property) {
        property = await Property.create({
          id,
          type,
          description,
          sellerName,
          price,
          image,
          date,
        });
      }

      return res.status(200).json(property);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
