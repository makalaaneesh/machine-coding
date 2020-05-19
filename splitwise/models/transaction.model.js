const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TransactionSchema = new Schema(
  {
    from_user: { type: String, required: true, max: 100 },
    to_user: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Transaction", TransactionSchema);
