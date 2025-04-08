const Blog = require("../models/blog.model");
var slugify = require("slugify");
const { customAlphabet } = require("nanoid");
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({
      status: "ok",
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        status: "error",
        message: "Title, description, category, and slug are required.",
      });
    }

    const slug =
      slugify(title.toLowerCase(), { strict: true }) +
      "-" +
      customAlphabet(alphabet, 10)();

    const blog = new Blog({ title, description, image, category, slug });
    await blog.save();

    return res.status(201).json({
      status: "ok",
      message: "Blog created successfully.",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found." });
    }

    return res.status(200).json({
      status: "ok",
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found." });
    }

    return res.status(200).json({
      status: "ok",
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
