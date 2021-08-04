const Property = require("../models/property");
const Sale = require("../models/sale");
const dayjs = require("dayjs");

module.exports = {
  async list(req, res) {
    try {
      const { includeSold, stranded, onlySold } = req.query;

      if (+onlySold === 1) {
        const sales = await Sale.find();
        const properties = await Property.find({
          _id: {
            $in: sales.map((sale) => {
              return sale.property;
            }),
          },
        });

        return res.json(properties);
      }

      // imoveis encalhados
      if (+stranded === 1) {
        const sales = await Sale.find();
        let properties = await Property.find({
          _id: {
            $nin: sales.map((sale) => {
              return sale.property;
            }),
          },
        });

        const currentDate = dayjs(new Date());

        properties = properties.filter((property) => {
          const propertyDate = dayjs(property.date);
          const diff = currentDate.diff(propertyDate, "month");
          if (diff >= 6) {
            return property;
          }
        });

        return res.json(properties);
      }

      // inclui imoveis vendidos
      if (+includeSold === 1) {
        const properties = await Property.find().populate("sale");
        return res.json(properties);
      }

      // filtra imoveis nao vendidos
      const sales = await Sale.find();
      const properties = await Property.find({
        _id: {
          $nin: sales.map((sale) => {
            return sale.property;
          }),
        },
      });

      return res.json(properties);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

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

        return res.status(201).json(property);
      }

      return res.status(409).json(property);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { description, sellerName, price, image, date } = req.body;

      let property = await Property.findOne({ id });

      if (!property) {
        return res.status(404).json({ error: `Property ${id} not found` });
      }

      await Property.updateOne(
        { id },
        { $set: { description, sellerName, price, image, date } },
        { omitUndefined: true }
      );

      const updated = await Property.findOne({ id });
      return res.json(updated);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      let property = await Property.findOne({ id });

      if (!property) {
        return res.status(404).json({ error: `Property ${id} not found` });
      }

      await Property.deleteOne({ id });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
