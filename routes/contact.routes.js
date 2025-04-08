const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  getAllContacts,
  createContact,
} = require("../controllers/contact.controller");

router.post("/", createContact);
router.get("/", auth, restrictTo(["admin"]), getAllContacts);

module.exports = router;
