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
const viewCart = async (req,res)=>{
  const id = req.params.id
  let UserCart = await Cart.get(id)
  if(UserCart.success == true){
    res.status(UserCart.code).json({Cart : UserCart.data})
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
    let data = await Cart.delete(req.body.id)
    if(data.success == true){
      res.status(data.code).json({message: data.message})
    }else{
      res.status(data.code).json({error: data.error})
    }

  }catch{
    res.status(500).json({error:"Unexpected Error"})
  }
}

module.exports = {
  removeFromCart,
  addToCart,
  deleteUserCart,
  viewCart
}