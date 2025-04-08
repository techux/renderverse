const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.post("/", auth, restrictTo(["admin"]), createProduct);
router.put("/:id", auth, restrictTo(["admin"]), updateProduct);
router.delete("/:id", auth, restrictTo(["admin"]), deleteProduct);

module.exports = router;
