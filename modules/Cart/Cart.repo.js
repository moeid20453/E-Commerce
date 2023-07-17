let Cart = require('./Cart.model')

exports.get = async (filter)=>{
  try {
    const { userId } = filter;
    const UserCart = await Cart.find({ userid: userId });
    return{
      success: true,   
      Cart: UserCart,
     };
  } catch (error) {
    return{
        success: false, 
        message: 'Failed to fetch wishlist items',     
  };
}}

exports.create = async (userId, vendorId) =>{
  try{
    const newList = new Cart({userid : userId , vendor: vendorId});
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

exports.deleteProduct = async (userId, productId) => {
  try{ 
   let cart = this.get(userId)
    cart.product = cart.product.filter(product => product.id.toString() !== productId)
    let removed = cart.product.filter(product => product.id.toString() == productId)
    let newtotal  = cart.total - removed.price
   const List = await Cart.findOneAndUpdate({ 
    userid : userId ,
    product : cart.product,
    total: newtotal, 
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

exports.addProduct = async (userId, product) => {
  try{ 
   let cart = this.get(userId)
   let total = cart.total + product.price
   cart.total = total
   const List = await Cart.findOneAndUpdate({ 
    userid : userId ,
    $push : {product: product},
    total: total, 
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

exports.delete = async (userId)=>{
  try {
    await Cart.findOneAndDelete({userid: userId});
    return{
      success: true,   
      message: "Successfully deleted user cart",
     };
  } catch (error) {
    return{
        success: false, 
        error: 'Failed to Delete wishlisted item',     
  };
}}