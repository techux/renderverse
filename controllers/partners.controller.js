const Partner = require("../models/partners.model");

const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    return res.status(200).json({
      status: "ok",
      data: partners,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const addPartner = async (req, res) => {
  try {
    const { name, image, link } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        status: "error",
        message: "Name and image are required.",
      });
    }

    const newPartner = new Partner({
      name,
      image,
      link,
    });

    await newPartner.save();

    return res.status(201).json({
      status: "ok",
      message: "Partner added successfully.",
      data: newPartner,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedPartner = await Partner.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedPartner) {
      return res.status(404).json({
        status: "error",
        message: "Partner not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Partner updated successfully.",
      data: updatedPartner,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPartner = await Partner.findByIdAndDelete(id);

    if (!deletedPartner) {
      return res.status(404).json({
        status: "error",
        message: "Partner not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Partner deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllPartners,
  addPartner,
  updatePartner,
  deletePartner,
};
