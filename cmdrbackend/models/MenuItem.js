const mongoose = require("mongoose");
const menuItemSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imgURL: {
    type: String,
  },

  tags: {
    type: Array,
    default: [],
  },
  posibleCourseMoments : {
    type: Array,
    default: [],
  },

  category_id: {
    type: String,
  },

});

module.exports = mongoose.model("MenuItem", menuItemSchema);
