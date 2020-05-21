const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

let BookingSchema = new Schema(
  {
    rider_id: { type: String, required: true, trim: true },
    driver_id: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = mongoose.model("Booking", BookingSchema);
