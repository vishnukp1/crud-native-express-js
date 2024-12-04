let mongoose = require("mongoose");

let userShema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  price: {
    type: Number,
    require: false,
  },
  category: {
    type: String,
    require: false,
  },
});

const stock = mongoose.model("stock", userShema);

module.exports = stock;
