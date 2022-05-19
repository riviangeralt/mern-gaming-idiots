const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/authController.js");
const {
  addCartItem,
  getAllCartItems,
  deleteCartItem,
  deleteAllCartItems,
} = require("../controllers/cartController.js");
const { userById } = require("../controllers/userController.js");

router
  .post("/cart/:userId", requireSignin, isAuth, addCartItem)
  .get("/cart/:userId", requireSignin, isAuth, getAllCartItems)
  .delete("/cart/:userId/:itemId", requireSignin, isAuth, deleteCartItem)
  .delete("/cart/:userId", requireSignin, isAuth, deleteAllCartItems);

router.param("userId", userById);

module.exports = router;
