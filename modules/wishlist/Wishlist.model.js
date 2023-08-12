const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  product: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
});

let WishlistModel = mongoose.model("Wishlist", WishlistSchema);

module.exports = WishlistModel;
