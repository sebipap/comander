const mongoose = require("mongoose");
const extraSchema = new mongoose.Schema({
  menuItem_id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Extra", extraSchema);
