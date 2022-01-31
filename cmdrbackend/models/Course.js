const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },

  menuItemVariant_id: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    default: 1,
  },

  status: {
    type: String,
    default: "idle",
  },

  special: {
    type: String,
  },

  courseMoment: {
    type: String,
    default: "main",
  },

  extras_ids: {
    type: Array
  },

  aditionalOptionsConfiguration: {
    type: Array
  }



});

module.exports = mongoose.model("Course", courseSchema);

