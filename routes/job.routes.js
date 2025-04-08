const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/job.controller");

router.get("/", getAllJobs);

router.post("/", auth, restrictTo(["admin"]), createJob);
router.put("/:id", auth, restrictTo(["admin"]), updateJob);
router.delete("/:id", auth, restrictTo(["admin"]), deleteJob);

module.exports = router;
