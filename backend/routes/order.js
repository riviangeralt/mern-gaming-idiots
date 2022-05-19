const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController.js");
const {
  create,
  orderList,
  orderStatus,
  updateOrderStatus,
  orderById,
  purchaseHistory,
} = require("../controllers/orderController.js");
const { userById } = require("../controllers/userController.js");

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, orderList);
router.get(
  "/order/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  orderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAuth,
  updateOrderStatus
);
router.get("/order/:userId", requireSignin, isAuth, purchaseHistory);

router.post("/order/create/:userId", requireSignin, isAuth, create);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
