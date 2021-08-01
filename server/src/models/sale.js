const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  salePrice: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
  },
});

module.exports = mongoose.model("Sale", SaleSchema);
