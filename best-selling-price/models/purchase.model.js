const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PurchaseSchema = new Schema(
  {
    user_id: { type: String, required: true, max: 100 },
    product_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Purchase", PurchaseSchema);
