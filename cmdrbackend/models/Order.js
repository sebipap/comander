const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  timeDate: {
    type: String,
    default: "unknown date",
  },

  deliveryLocation: {
    type: String,
    default: "unknown table",
  },

  status: {
    type: String,
    default: "idle",
  },

  orderNote: {
    type: String,
    default: "unknown extras",
  },

  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Order", orderSchema);
