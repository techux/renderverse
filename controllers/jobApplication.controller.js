const JobApplication = require("../models/jobApplication.model");
const Job = require("../models/job.model");

const createApplication = async (req, res) => {
  try {
    const { name, email, phone, city, country, jobId, resume, message } =
      req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !city ||
      !country ||
      !jobId ||
      !resume ||
      !message
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required.",
      });
    }

    const application = new JobApplication({
      name,
      email,
      phone,
      city,
      country,
      jobId,
      resume,
      message,
    });

    await application.save();

    return res.status(201).json({
      status: "ok",
      message: "Application submitted successfully.",
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().populate("jobId");
    return res.status(200).json({
      status: "ok",
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getApplicationsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await JobApplication.find({ jobId }).populate("jobId");

    return res.status(200).json({
      status: "ok",
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationsByJobId,
};
