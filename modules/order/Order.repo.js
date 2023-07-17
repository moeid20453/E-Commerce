const Order = require('../order/Order.Model');
const Product = require('../product/Product.Model');


exports.Create = async (filter) => {
  const { items: cartItems, tax, shippingFee , user} = filter;
  if (!cartItems || cartItems.length < 1) {
    return{
      success: false,
      code: 400,
      error: "The cart doesn't have any items"
    }
  }
  if (!tax || !shippingFee) {
    return{
      success: false,
      code: 400,
      error: 'Please provide tax and shipping fee'
    }

  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      return{
        success: false,
        code: 400,
        error: `No product with id : ${item.product}`
      }
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }
  // calculate total
  const total = tax + shippingFee + subtotal;
  // get client secret

  const newOrder = new Order({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    user: user,
  })
  await newOrder.save();
  return{
    success: true,
    record: newOrder,
    code: 201,
  }; 
};
exports.get = async (filter)=>{
  let id = filter.id
  if(id){
    const order = await Order.find({id});
  return{
    success: true,
    record: orders,
    code:200
  }
  }
  const orders = await Order.find({filter});
  return{
    success: true,
    record: orders,
    code:200
  }
}
exports.update = async(id, status)=>{
  try{
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return{
        success: false,
        code: 500,
        error: "There is no order with this id"
      }
    }
    order.status = status;
    await order.save();
  }catch{
    return{
      success: false,
      code: 400,
      error: "Unexpected error"
    }
  }
}
exports.delete = async(id)=>{
  try{
    await Order.findByIdAndDelete(id)
    return{
      success:True,
      message: "Successfully deleted this order"
    }
  }catch{
    return{
      success: false,
      code:200,
      error: "failed to delete Order"
    }
  }
}