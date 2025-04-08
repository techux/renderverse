const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

router.get("/", getAllServices);
router.post("/", auth, restrictTo(["admin"]), createService);
router.put("/:id", auth, restrictTo(["admin"]), updateService);
router.delete("/:id", auth, restrictTo(["admin"]), deleteService);

module.exports = router;
