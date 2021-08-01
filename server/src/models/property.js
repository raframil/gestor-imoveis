const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  sale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sale",
  },
});

module.exports = mongoose.model("Property", PropertySchema);
