const mongoose = require("mongoose");
const aditionalOptionSchema = new mongoose.Schema({
  menuItem_id: {
    type: String,
    required: true,
  },

  propertyName: {
    type: String,
    required: true,
  },

  options: {
    type: Array
  }

});

module.exports = mongoose.model("AditionalOption", aditionalOptionSchema);
