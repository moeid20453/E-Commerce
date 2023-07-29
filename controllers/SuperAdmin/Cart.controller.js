const Cart = require('../../modules/Cart/Cart.repo')
const Prod = require('../../modules/product/Product.repo')



const addToCart = async(req,res)=>{
  try{
    let {userId, productid} = req.body
    let product = await Prod.getSingleProduct(productid)
    let cartitem = await Cart.addProduct(userId,{product: product})
    if(cartitem.success ==true ){
      res.status(cartitem.code).json({addedproduct : cartitem.data})
    }else{
      res.status(cartitem.code).json({error: cartitem.error})
    }
  }catch{
    res.status(500).json({error:"Unexpected Error"})
  }
}

const removeFromCart = async(req,res)=>{
  try{
    let {userId, productid} = req.body
    let cartitem = await Cart.deleteProduct(userId,productid)
    if(cartitem.success ==true ){
      res.status(cartitem.code).json({removedproduct : cartitem.data})
    }else{
      res.status(cartitem.code).json({error: cartitem.error})
    }
  }catch{
    res.status(500).json({error:"Unexpected Error"})
  }
}
const deleteUserCart = async(req,res)=>{
  try{

  }catch{
    
  }
}

module.exports = {
  removeFromCart,
  addToCart
}