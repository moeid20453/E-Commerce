const Prod = require('../../modules/product/Product.repo')

const createProduct = async (req, res) => {
try{
  let product = await Prod.create(req)
  if(product.success == true){
    res.status(product.code).json({product: product.record});  
  }else{
    res.status(product.code).json({product: product.record});
  }
}catch{
res.status(500).json({error: "Unexpected error while Creating product"})
}};


const GetProduct = async(req,res)=>{
  try{
    let id = req.body.id
    let product = await Prod.getSingleProduct(id)
    if(product.success == true){
      ; 
      res.status(product.code).json({product: product.record})
    }else{
      res.status(product.code).json({product: product.error})
    }}catch{
      res.status(500).json({error:"Unexpected Error while finding product"})
  }}
  
  const GetAllProducts = async(req,res)=>{
    try{
      let Products = await Prod.getAll()
      if(Products.success == true){
        res.status(Products.code).json({products: Products.record})
      }else{
        res.status(Products.code).json({error: Products.error})
      }
    }catch{
      res.status(500).json({error: "Unexpected Error"})
    }}


    const UpdateProdcut = async(req,res)=>{
      try{
        let id = req.body.id
        let newprod = req.body.update
        let update = Prod.update({id:id,product: newprod})
        if(update.success == true){
          res.status(update.code).json({update: Products.record})
        }else{
          res.status(update.code).json({error: update.error})
        }
      }catch{
        res.status(500).json({error: "Unexpected Error"})
      }}


module.exports = {
  GetAllProducts,
  GetProduct,
  createProduct,
  UpdateProdcut
}