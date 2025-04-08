const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  getAllTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/team.controller");

router.get("/", getAllTeamMembers);
router.post("/", auth, restrictTo(["admin"]), addTeamMember);
router.put("/:id", auth, restrictTo(["admin"]), updateTeamMember);
router.delete("/:id", auth, restrictTo(["admin"]), deleteTeamMember);

module.exports = router;
