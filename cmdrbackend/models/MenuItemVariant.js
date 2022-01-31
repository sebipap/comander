const mongoose = require("mongoose");
const menuItemVariantSchema = new mongoose.Schema({
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

module.exports = mongoose.model("MenuItemVariant", menuItemVariantSchema);
