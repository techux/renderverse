const Testimonial = require("../models/testimonial.model");

const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    return res.status(200).json({
      status: "ok",
      data: testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { name, description, rating, image } = req.body;

    if (!name || !description || !rating) {
      return res.status(400).json({
        status: "error",
        message: "Name, description and rating are required.",
      });
    }

    const newTestimonial = new Testimonial({
      name,
      description,
      rating,
      image,
    });

    await newTestimonial.save();

    return res.status(201).json({
      status: "ok",
      message: "Testimonial created successfully.",
      data: newTestimonial,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({
        status: "error",
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Testimonial updated successfully.",
      data: updatedTestimonial,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Testimonial.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
