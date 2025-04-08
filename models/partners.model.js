const mongoose = require("mongoose");

const partnershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const Partners = mongoose.model("Partnership", partnershipSchema);

module.exports = Partners;
