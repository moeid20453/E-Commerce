let Cart = require("./Cart.model");

// Get cart by user ID
exports.get = async (id) => {
  try {
    const UserCart = await Cart.find({ userId: id })
      .populate('orderItems.product') // Populate product details
      .lean(); // Convert to plain JS object for better performance
    
    if (!UserCart) {
      return {
        success: false,
        code: 404,
        message: "Cart not found"
      };
    }

    return {
      success: true,
      data: UserCart,
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      success: false,
      message: "Failed to fetch cart items",
      error: error.message
    };
  }
};

// Create new cart
exports.create = async (userId) => {
  try {
    // Check if user already has a cart
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
      return {
        success: false,
        code: 400,
        error: "User already has a cart"
      };
    }

    const newCart = new Cart({ userId, orderItems: [], total: 0 });
    await newCart.save();
    
    return {
      success: true,
      data: newCart,
      code: 201,
    };
  } catch (err) {
    console.error("Error creating cart:", err);
    return {
      success: false,
      code: 500,
      error: err.message
    };
  }
};

// Remove product from cart
exports.deleteProduct = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return {
        success: false,
        code: 404,
        error: "Cart not found"
      };
    }

    // Find product in cart
    const productIndex = cart.orderItems.findIndex(
      item => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return {
        success: false,
        code: 404,
        error: "Product not found in cart"
      };
    }

    // Remove product and update total
    const removedItem = cart.orderItems[productIndex];
    cart.orderItems.splice(productIndex, 1);
    cart.total = cart.orderItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );

    await cart.save();

    return {
      success: true,
      code: 200,
      data: cart
    };
  } catch (err) {
    console.error("Error removing product:", err);
    return {
      success: false,
      code: 500,
      error: err.message
    };
  }
};

// Add product to cart
exports.addProduct = async (userId, product, quantity) => {
  try {
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return {
        success: false,
        code: 404,
        error: "Cart not found"
      };
    }

    // Check if product already exists
    const existingItemIndex = cart.orderItems.findIndex(
      item => item.product.toString() === product._id.toString()
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart.orderItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.orderItems.push({
        product: product._id,
        quantity: quantity
      });
    }

    // Recalculate total
    cart.total = cart.orderItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );

    await cart.save();

    return {
      success: true,
      code: 200,
      data: cart
    };
  } catch (err) {
    console.error("Error adding product:", err);
    return {
      success: false,
      code: 500,
      error: err.message
    };
  }
};

// Update product quantity
exports.changeQuantity = async (userId, productId, quantity) => {
  try {
    if (quantity < 1) {
      return {
        success: false,
        code: 400,
        error: "Quantity must be at least 1"
      };
    }

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return {
        success: false,
        code: 404,
        error: "Cart not found"
      };
    }

    const itemIndex = cart.orderItems.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return {
        success: false,
        code: 404,
        error: "Product not found in cart"
      };
    }

    // Update quantity
    cart.orderItems[itemIndex].quantity = quantity;

    // Recalculate total
    cart.total = cart.orderItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );

    await cart.save();

    return {
      success: true,
      code: 200,
      data: cart
    };
  } catch (err) {
    console.error("Error updating quantity:", err);
    return {
      success: false,
      code: 500,
      error: err.message
    };
  }
};

// Delete cart
exports.delete = async (userId) => {
  try {
    const result = await Cart.findOneAndDelete({ userId });
    
    if (!result) {
      return {
        success: false,
        code: 404,
        error: "Cart not found"
      };
    }

    return {
      success: true,
      code: 200,
      message: "Successfully deleted user cart"
    };
  } catch (error) {
    console.error("Error deleting cart:", error);
    return {
      success: false,
      code: 500,
      error: error.message
    };
  }
};

// New functions added:

// Clear all items from cart
exports.clearCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return {
        success: false,
        code: 404,
        error: "Cart not found"
      };
    }

    cart.orderItems = [];
    cart.total = 0;
    await cart.save();

    return {
      success: true,
      code: 200,
      message: "Cart cleared successfully"
    };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return {
      success: false,
      code: 500,
      error: error.message
    };
  }
};

// Get cart count
exports.getItemCount = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return {
        success: false,
        code: 404,
        error: "Cart not found"
      };
    }

    const itemCount = cart.orderItems.reduce((count, item) => 
      count + item.quantity, 0
    );

    return {
      success: true,
      code: 200,
      count: itemCount
    };
  } catch (error) {
    console.error("Error getting cart count:", error);
    return {
      success: false,
      code: 500, 
      error: error.message
    };
  }
};

// Merge carts (useful for guest cart -> user cart after login)
exports.mergeCarts = async (sourceUserId, targetUserId) => {
  try {
    const sourceCart = await Cart.findOne({ userId: sourceUserId });
    const targetCart = await Cart.findOne({ userId: targetUserId });
    
    if (!sourceCart || !targetCart) {
      return {
        success: false,
        code: 404,
        error: "One or both carts not found"
      };
    }

    // Merge items
    for (const sourceItem of sourceCart.orderItems) {
      const existingItemIndex = targetCart.orderItems.findIndex(
        item => item.product.toString() === sourceItem.product.toString()
      );

      if (existingItemIndex > -1) {
        targetCart.orderItems[existingItemIndex].quantity += sourceItem.quantity;
      } else {
        targetCart.orderItems.push(sourceItem);
      }
    }

    // Recalculate total
    targetCart.total = targetCart.orderItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );

    await targetCart.save();
    await Cart.findOneAndDelete({ userId: sourceUserId });

    return {
      success: true,
      code: 200,
      data: targetCart
    };
  } catch (error) {
    console.error("Error merging carts:", error);
    return {
      success: false,
      code: 500,
      error: error.message
    };
  }
};
