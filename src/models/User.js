const mongoose = require("mongoose");
const VehiclesSchmea = require("./Vehicles");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      createIndexes: { unique: true },
    },
    vehicles: [Object],
    password: {
      type: String,
    },
    city: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    adress: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    idFacebook: {
      type: String,
    },
    idGoogle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
