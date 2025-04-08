const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

router.get("/", getAllBlogs);
router.post("/", auth, restrictTo(["admin"]), createBlog);
router.put("/:id", auth, restrictTo(["admin"]), updateBlog);
router.delete("/:id", auth, restrictTo(["admin"]), deleteBlog);

module.exports = router;
