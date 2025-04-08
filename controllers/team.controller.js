const Team = require("../models/team.model");

const getAllTeamMembers = async (req, res) => {
  try {
    const team = await Team.find();
    return res.status(200).json({
      status: "ok",
      data: team,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const addTeamMember = async (req, res) => {
  try {
    const { name, image, role, socialLinks } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        status: "error",
        message: "Name and role are required.",
      });
    }

    const newMember = new Team({
      name,
      image,
      role,
      socialLinks,
    });

    await newMember.save();

    return res.status(201).json({
      status: "ok",
      message: "Team member added successfully.",
      data: newMember,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedMember = await Team.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedMember) {
      return res.status(404).json({
        status: "error",
        message: "Team member not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Team member updated successfully.",
      data: updatedMember,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({
        status: "error",
        message: "Team member not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Team member deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
