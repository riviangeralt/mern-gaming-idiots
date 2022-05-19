const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");

exports.orderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        error: "Order not found",
      });
    }
    req.order = order;
    next();
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.create = (req, res) => {
  try {
    let history = [];
    req.body.order.user = req.profile;
    const newOrder = new Order(req.body.order);
    newOrder.save(async (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to create order",
        });
      }
      req.body.order.cartItems.forEach(async (item) => {
        history.push({
          _id: item._id,
          name: item.game.name,
          image: item.game.background_image,
          slug: item.game.slug,
          amount: item.game.id,
          transaction_id: order._id,
        });
      });
      const user = await User.findById(req.profile._id);
      user.history.push(...history);
      await user.save();
      res.json(order);
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.orderList = async (req, res) => {
  try {
    Order.find({})
      .sort("-created")
      .exec((err, orders) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to get orders",
          });
        }
        return res.json(orders);
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.orderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.body.orderId,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    if (!order) {
      return res.status(400).json({
        error: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.purchaseHistory = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.profile._id,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
