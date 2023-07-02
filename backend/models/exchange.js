//Creating exchange model for inserting record in Database

const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema({
  exchange_id: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
  },
  volume: {
    type: Number,
  },
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;
