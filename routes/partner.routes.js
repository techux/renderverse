const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  getAllPartners,
  addPartner,
  updatePartner,
  deletePartner,
} = require("../controllers/partners.controller");

router.get("/", getAllPartners);
router.post("/", auth, restrictTo(["admin"]), addPartner);
router.put("/:id", auth, restrictTo(["admin"]), updatePartner);
router.delete("/:id", auth, restrictTo(["admin"]), deletePartner);

module.exports = router;
