const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  getAllTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

router.get("/", getAllTestimonial);
router.post("/", auth, createTestimonial);
router.put("/:id", auth, restrictTo(["admin"]), updateTestimonial);
router.delete("/:id", auth, restrictTo(["admin"]), deleteTestimonial);

module.exports = router;
