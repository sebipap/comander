const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({

  requestTimeDate: {
    type: Date,
    default: Date.parse(0),
  },
  acceptTimeDate: {
    type: Date,
    default: Date.parse(0),
  },
  finishTimeDate: {
    type: Date,
    default: Date.parse(0),
  },

  deliveryLocation: {
    type: String,
    default: Date.parse(0),
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
