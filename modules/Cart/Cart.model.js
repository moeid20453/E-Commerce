const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
  product: { 
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  }
});

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
  orderItems: [SingleOrderItemSchema],
  total: { 
    type: Number,
    default: 0,
    required: true }

});
  

let Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;