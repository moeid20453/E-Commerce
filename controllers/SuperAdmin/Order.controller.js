const paypal = require('@paypal/checkout-server-sdk');
const Orders = require("../../modules/order/Order.repo")
const { CLIENT_ID, APP_SECRET } = process.env;
const baseURL = "https://sandbox.paypal.com"

let environment = new paypal.core.SandboxEnvironment(CLIENT_ID, APP_SECRET);
let client = new paypal.core.PayPalHttpClient(environment)

const createOrder = async(req,res)=>{
  try{
    let cart = req.body.cart
    let order = await Orders.Create(cart,req.body.tax,req.body.shippingFee)

    const items = order.orderItems.map((item) => ({
      name: item.name,
      price: item.price,
      currency: 'USD', 
      quantity: item.quantity,
    }));
    const request = new paypal.orders.OrdersCreateRequest()

    request.prefer("return-representation");
  
    request.requestBody({ 
    intent:"CAPTURE",
    purchase_units:[
      {
        amount:{
          currency_code: "USD",
          value: cart.total,
          breakdown:{
            item_total:{
              currency_code:"USD",
              value: cart.total
            }
  
          }
        },
        items: items
      }
    ]
  })
  try{
    const order = await client.execute(request)
    console.log(order)
  }catch(error){
    console.log(error);
    res.status(400).json({error:"Error"})
  }
  }catch(error){
    console.log(error);
    res.status(400).json({error:"Error"})
  }
} 
module.exports = {
  createOrder
}
