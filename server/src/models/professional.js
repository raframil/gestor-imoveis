const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creci: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: false,
  },
  admissionDate: {
    type: Date,
    required: false,
  },
  commissionPercentage: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Professional", ProfessionalSchema);
