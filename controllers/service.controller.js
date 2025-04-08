const Service = require("../models/service.model");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json({
      status: "ok",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, image, category } = req.body;

    if (!name || !description || !category) {
      return res.status(400).json({
        status: "error",
        message: "Name, description, and category are required.",
      });
    }

    const newService = new Service({
      name,
      description,
      image,
      category,
    });

    await newService.save();

    return res.status(201).json({
      status: "ok",
      message: "Service created successfully.",
      data: newService,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedService = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).json({
        status: "error",
        message: "Service not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Service updated successfully.",
      data: updatedService,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        status: "error",
        message: "Service not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Service deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};
