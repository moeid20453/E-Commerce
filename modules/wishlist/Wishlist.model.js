const mongoose = require('mongoose');


const WishlistSchema = mongoose.Schema({
  userid:{
    type: String,
    required: true
  },
  product:{
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  }


})


let WishlistModel = mongoose.model("Wishlist", UserSchema);

module.exports = WishlistModel;