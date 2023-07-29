const  {
  getAllAdmins,
  getAdminUser,
  deleteAdminUser,
  updateAdminUser,
  createAdminUser } = require("./Admin.controller")
const {
  login,
  logout}= require("./Auth.controller")
const { 
  removeFromCart,
  addToCart} =require('./Cart.controller')
const {createOrder }= require('./Order.controller')
const {
  GetAllProducts,
  GetProduct,
  createProduct,
  UpdateProdcut} = require("./Product.controller")
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser} = require("./User.controller")


  module.exports = {
  login,
  logout,
  getAllAdmins,
  getAdminUser,
  deleteAdminUser,
  updateAdminUser,
  createAdminUser,
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
  createOrder
  }