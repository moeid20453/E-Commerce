const { login, logout } = require("./Auth.controller");
const { removeFromCart, addToCart } = require("./Cart.controller");
const { createOrder } = require("./Order.controller");
const {
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReviews,
} = require("./Review.controller");
const {
  GetAllProducts,
  GetProduct,
  createProduct,
  UpdateProdcut,
} = require("./Product.controller");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} = require("./User.controller");

module.exports = {
  login,
  logout,
  GetAllProducts,
  GetProduct,
  createProduct,
  UpdateProdcut,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  removeFromCart,
  addToCart,
  createOrder,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReviews,
};
