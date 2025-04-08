const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
} = require("../controllers/auth.controller");

const { auth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", auth, logoutController);

module.exports = router;
