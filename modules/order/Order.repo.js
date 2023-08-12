const Order = require("../order/Order.Model");
const Product = require("../product/Product.Model");

exports.Create = async (cart, tax, shippingFee) => {
  const { orderItems, userId } = cart;
  if (!orderItems || orderItems.length < 1) {
    return {
      success: false,
      code: 400,
      error: "The cart doesn't have any items",
    };
  }
  let subtotal = 0;

  for (const item of orderItems) {
    subtotal += item.quantity * price;
  }
  const total = tax + shippingFee + subtotal;
  const newOrder = new Order({
    user: userId,
    tax,
    shippingFee,
    vendor,
    subtotal,
    total,
    items,
  });
  await newOrder.save();
  return {
    success: true,
    data: newOrder,
    code: 201,
  };
};

exports.get = async (filter) => {
  const orders = await Order.find({ filter });
  return {
    success: true,
    data: orders,
    code: 200,
  };
};

exports.update = async (id, status) => {
  try {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return {
        success: false,
        code: 500,
        error: "There is no order with this id",
      };
    }
    order.status = status;
    await order.save();
  } catch {
    return {
      success: false,
      code: 400,
      error: "Unexpected error",
    };
  }
};
exports.delete = async (id) => {
  try {
    await Order.findByIdAndDelete(id);
    return {
      success: True,
      message: "Successfully deleted this order",
    };
  } catch {
    return {
      success: false,
      code: 200,
      error: "failed to delete Order",
    };
  }
};
