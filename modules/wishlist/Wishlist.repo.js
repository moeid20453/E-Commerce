const Wish = require("./Wishlist.model")


exports.add = async (filter)=>{
  try {
    const { userId, productId } = filter;
    const wishlistItem = await Wishlist.create({ userId, productId });
    return{
      success: true, 
      message: 'Item added to the wishlist.',
      item: wishlistItem,
     };
  } catch (error) {
    return{
        success: false, 
        message: 'Failed to add item to the wishlist.',     
  };
}}

exports.get = async (filter)=>{
  try {
    const { userId } = filter;
    const wishlistItems = await Wishlist.find({ userid: userId }).populate('productId');
    return{
      success: true,   
      items: wishlistItems,
     };
  } catch (error) {
    return{
        success: false, 
        message: 'Failed to fetch wishlist items',     
  };
}}


exports.delete = async (filter)=>{
  try {
    const { wishlistId } = filter;
    await Wishlist.findByIdAndDelete(wishlistId);
    return{
      success: true,   
      items: wishlistItems,
     };
  } catch (error) {
    return{
        success: false, 
        message: 'Failed to Delete wishlisted item',     
  };
}}