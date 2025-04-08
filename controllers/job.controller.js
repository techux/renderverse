const Job = require("../models/job.model");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json({
      status: "ok",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, type, skills, responsibility } = req.body;

    if (!title || !type || !skills || !responsibility) {
      return res.status(400).json({
        status: "error",
        message:
          "All fields are required: title, type, skills, responsibility.",
      });
    }

    const job = new Job({
      title,
      type,
      skills,
      responsibility,
    });

    await job.save();

    return res.status(201).json({
      status: "ok",
      message: "Job created successfully.",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({
        status: "error",
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Job updated successfully.",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Job.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Job deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
};
