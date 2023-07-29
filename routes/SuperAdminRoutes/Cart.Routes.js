const app = require('express').Router()
const {
  authenticateUser
} = require('../../middleware/authentication');
const { removeFromCart, addToCart} = require("../../controllers/Client/Index.controller")

app.post('/add-item',authenticateUser,addToCart)
app.post('/remove-item',authenticateUser, removeFromCart)


module.exports = app;