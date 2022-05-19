const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Orders = require("../models/orderModel");

exports.allUsers = async (req, res) => {
  const orders = await Orders.find();

  User.find({}, (err, users) => {
    if (err || !users) {
      return res.status(400).json({ message: "Not found" });
    }
    let newDate = [];
    users.map((user) => {
      newDate.push(user.createdAt.toISOString().split("T")[0]);
    });
    let rDuplicates = new Set(newDate);
    let myArr = Array.from(rDuplicates);
    let usersData = [];
    for (let i = 0; i < myArr.length; i++) {
      let dataHere = users
        .filter(
          (item) => item.createdAt.toISOString().split("T")[0] === myArr[i]
        )
        .flat();
      usersData.push(dataHere.length);
    }
    res.json({
      date: myArr,
      user: usersData,
      totalUsers: users.length,
      orders: orders.length,
    });
  });
};

exports.usersData = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err || !users) {
      return res.status(400).json({ message: "Not found" });
    }
    let data = [];
    users.map((user) => {
      let x = {
        name: user.name,
        email: user.email,
        history: user.history,
        role: user.role,
        id: user._id,
      };
      data.push(x);
    });
    res.status(200).json({ data });
    next();
  });
};

exports.authUser = async (req, res, next, id) => {
  const userWithCart = await User.findById(id).populate("cartItems");
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ user: userWithCart });
    next();
  });
};
