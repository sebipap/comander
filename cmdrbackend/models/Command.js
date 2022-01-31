const mongoose = require("mongoose");
const commandSchema = new mongoose.Schema({
  kitchen: {
    type: String,
    default: "unknown kitchen",
  },
  date: {
    type: String,
    default: "unknown date",
  },
  time: {
    type: String,
    default: "unknown time",
  },
  waiter: {
    type: String,
    default: "unknown waiter",
  },
  table: {
    type: String,
    default: "unknown table",
  },

  extras: {
    type: String,
    default: "unknown extras",
  },

  status: {
	  type: String,
	  default: "idle"
  }
});

module.exports = mongoose.model("Command", commandSchema);
