const {
  register,
  login,
  updateUser,
  logout,
  activateUser } = require('./Auth.controller')
const {
  removeFromCart,
  addToCart} = require('./Cart.controller')
const {getUser} = require('./User.controller')
const {createOrder} =require("./Order.controller")


module.exports ={
  register,
  login,
  updateUser,
  logout,
  activateUser,
  removeFromCart,
  addToCart,
  getUser,
  createOrder
}