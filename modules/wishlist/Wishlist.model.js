const mongoose = require('mongoose');


const WishlistSchema = mongoose.Schema({
  user:{
    type: String,
    required: true
  },
  product:[
      { 
      type: mongoose.Schema.ObjectId,
      ref: 'Product'}
    
  ]
})


let WishlistModel = mongoose.model("Wishlist", UserSchema);

module.exports = WishlistModel;