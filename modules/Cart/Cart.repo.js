const { remove } = require('../user/User.repo');
let Cart = require('./Cart.model')

exports.get = async (filter)=>{
  try {
    const { userId } = filter;
    const UserCart = await Cart.find({ userid: userId });
    return{
      success: true,   
      data: UserCart,
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
    cart.product = cart.product.filter(product => product._id.toString() !== productId)
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

exports.addProduct = async (userId, product,quantity) => {
  try{ 
   let cart = await this.get(userId)
   let products = cart.data.orderItems

   const exists = products.map(item => item._id === product._id);

   if(exists == true ){
    const addedToExists = products.map(item => {
      if(item => item._id === product._id){
        let num = item.quantity + quantity
        return{ quantity : num }
      }
      return item
    }); 
    cart.data.orderItems = addedToExists
    let newitemprice = product.price * quantity
   let total = cart.total + newitemprice
   const List = await Cart.findOneAndUpdate({ 
    userid : userId ,
    orderItems : addedToExists,
    total: total, 
    new: true,
    runValidators: true,
   });
   if (!List) {
    return{
      success: false,
      code: 500,
      error: `No User with this ID`
    }}else{
      return{
        success: true,
        code: 200,
        data: List,
      }
    }}
   let newItem = {product: product, quantity: quantity}
   let newitemprice = product.price * quantity
   let total = cart.total + newitemprice
   cart.total = total
   const List = await Cart.findOneAndUpdate({ 
    userid : userId ,
    $push : {orderItems: newItem},
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

 exports.changeQuantity = async(userId, productId, quantity)=>{
  let cart = await this.get(userId)
  let products = cart.data.orderItems

  const exists = products.map(item => {if(item._id === productId){
    return item
  }});

  let removedprice = exists.product.price * exists.quantity
  cart.data.total = cart.data.total - removedprice

  const added = products.map(item => {
    if(item => item._id === productId){
      return{ quantity : quantity }
    }
    return item
  }); 
  
  let newprice = exists.product.price * quantity
  let total = cart.total + newprice

  const List = await Cart.findOneAndUpdate({ 
    userid : userId ,
    orderItems : added,
    total: total, 
    new: true,
    runValidators: true,
  });
  if (!List) {
    return{
      success: false,
      code: 500,
      error: `No User with this ID`
  }}else{
    return{
      success: true,
      code: 200,
      data: List,
    }}}


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