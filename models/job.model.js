const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["fulltime", "intern", "contract", "freelancer"],
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    responsibility: {
      type: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
