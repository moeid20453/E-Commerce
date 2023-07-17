let Wish = require("./Wishlist.model")

exports.get = async (filter)=>{
  try {
    const { userId } = filter;
    const wishlistItems = await Wish.find({ userid: userId }).populate('productId');
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

exports.create = async (userId) =>{
  try{
    const newList = new Wish({userid : userId });
      await newList.save();
      return{
        success: true,
        record: newList,
        code: 201,
      };

  }catch(err){
    console.log("error message", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error !"
    }
  }
}

exports.update = async (userId, productId) => {
  try{ 
   const List = await Wish.findOneAndUpdate({ 
    userid : userId ,
    $push : {product: productId }, 
    new: true,
    runValidators: true,
   });
   if (!List) {
     return{
       success: false,
       code: 500,
       error: `No User with this ID`
     }
   }
   else{return{
     success: true,
     code: 200,
     data: List,
     
   }}
  }catch(err){
   console.log("Error", err.message);
     return{
       success: false,
       code: 500,
       error: "Unexpected Error"
     }
 }
 };

exports.delete = async (id)=>{
  try {
    await Wish.findByIdAndDelete(id);
    return{
      success: true,   
      message: "Successfully deleted wishlisted item",
     };
  } catch (error) {
    return{
        success: false, 
        error: 'Failed to Delete wishlisted item',     
  };
}}