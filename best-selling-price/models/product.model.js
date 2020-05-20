const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  category_id: { type: String, required: true },
  buyer_list: { type: [String] },
  blacklisted_users: { type: [String] },
});

//Export the model
module.exports = mongoose.model("Product", ProductSchema);
