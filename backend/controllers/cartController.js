const Cart = require("../models/cartModel");
const User = require("../models/userModel");

exports.addCartItem = async (req, res) => {
  const { userId } = req.params;
  try {
    const newCartItem = {
      userId: userId,
      game: req.body,
    };
    const cart = await Cart.create(newCartItem);
    const user = await User.findById(userId);
    user.cartItems.push(cart._id);
    await user.save();
    const updatedCart = await User.findById(userId).populate(
      "cartItems",
      "game"
    );

    res.status(200).json({
      message: "Item Added Successfully!",
      cart: updatedCart.cartItems,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" }); //return error message
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.itemId);
    if (!cartItem) {
      return res.status(404).json({ message: "No cart item found" });
    }

    if (cartItem.userId.toString() !== req.params.userId.toString()) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    await cartItem.remove();

    const user = await User.findById(req.params.userId);
    const index = user.cartItems.indexOf(req.params.itemId);
    user.cartItems.splice(index, 1);
    await user.save();

    const updatedCart = await User.findById(req.params.userId).populate(
      "cartItems",
      "game"
    );

    res
      .status(200)
      .json({ message: "Cart item deleted", cart: updatedCart.cartItems });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.getAllCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "cartItems",
      "game"
    );

    res.status(200).json({
      message: "Cart items fetched successfully",
      cartItems: user.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.deleteAllCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.cartItems = [];
    await user.save();

    const updatedCart = await User.findById(req.params.userId).populate(
      "cartItems",
      "game"
    );

    res.status(200).json({
      message: "Cart cleared successfully",
      cartItems: updatedCart.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
