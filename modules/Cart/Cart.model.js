const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  product: [{ 
    type: mongoose.Schema.ObjectId,
    ref: 'Product'}],
  total: { 
    type: Number,
    default: 0,
    required: true }

});
  

let Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;