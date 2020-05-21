const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  category_id: { type: String, required: true },
  buys: {
    type: Map,
    of: Number,
  },
  blacklisted_users: { type: [Array] },
});

//Export the model
module.exports = mongoose.model("Product", ProductSchema);
