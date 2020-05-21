const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    user_type: { type: String, required: true },
    availability: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.index({ location: "2dsphere" });
//Export the model
module.exports = mongoose.model("User", UserSchema);
