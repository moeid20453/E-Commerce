let User = require("./User.Model")
let bcrypt = require('bcrypt')
let fs = require('fs')
const Order = require('../order/Order.Model')
const Review = require("../review/Review.Model")
const { log } = require("console")


exports.isExist = async (filter)=>{
  try{
  const user  = await User.findOne(filter);
  if (user){
    return {
      success: true,
      record: user ,
      code: 200
    }
  }else{
    return{
      success: false,
      err: "User not found" ,
      code: 404
    }
  }
} catch(err){
  console.log("Error", err.message);
  return{
    success: false,
    code: 500,
    error: "Unexpected Error"
  }
}
}
exports.get = async (id)=>{
  try {
    if(filter){
      let record = await User.findOne(filter).select("-password");
      if(record){
        return{
          success: true,
          record: record,
          code: 200
        };
      }
      else{
        return{
          success: false,
          code: 404,
          error: "User not found"
        };
      }
    }
    else{
      return{
        success: false,
        code: 404,
        error: "User ID is required"
      }
    }
  }catch(err){
    return{
      success: false,
      code: 500,
      error: "Unexpected Error!"
    }

  }
}

exports.list = async (filter) =>{
  try {
    let users = await User.find(filter).select("-password");
    return{
      success : true,
      record: users,
      code: 200
    }
  }catch(err){
    console.log("error message", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected error"
    }
  }
}
exports.create = async (form) =>{
  try{
    if(form.email) form.email = form.email.toLowerCase()
    let user = await this.isExist({email: form.email})
    if(!user.success){
      const newUser = new User(form);
      await newUser.save();
      return{
        success: true,
        record: newUser,
        code: 201,
      };
    }else{
      return{
        success: false,
        error: "User already Exists",
        code: 409
      }
    }
  }catch(err){
    console.log("error message", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error !"
    }
  }
}
exports.update = async (_id, form) =>{
  try{
    const user = await this.isExist({_id});
    if(user.success){
      if(form.email){
        form.email = form.email.toLowerCase()
        const duplicate = await this.isExist({email: form.email})
        if(duplicate.success && duplicate.record._id != user.record._id){
          return{
            success: false,
            error: "this email is taken by another user",
            code: 409
          };
        }
        await User.findByIdAndUpdate({_id}, form)
        let userUpdate = await this.isExist({_id})
        return{
          success: true,
          record: userUpdate.record,
          code:201
        };
      }
    }else{
      return{
        success: false,
        error: user.error,
        code:404
      }
    }
  }catch(err){
    console.log("Error", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error"
    }

  }
}

exports.remove = async (_id,role)=>{
  try{
    const user = await this.isExist({_id, role:role});
    if(user.success){
      await User.findByIdAndDelete({_id})
      await Cart.deleteMany({"user": _id})
      await Wishlist.deleteMany({"user": _id})
      let reviews =  await Review.list({"user": _id})
      await reviews.records.map((review)=>{
        Review.remove(review._id)
      })
      await Order.deleteMany({"user": _id})
      return{
        success: true,
        code:200
      }
    } else{
      return{
        success:false,
        error: "This user Doesn't exist",
        code: 405
      }
    }
  }catch(err){
    console.log("Error", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error"
    }

  }
}
exports.comparePassword = async (email, password) =>{
  try{
    email = email.toLowerCase()
    let user = await this.isExist({email})
    if(user.success){
      let match = await bcrypt.compare(password, user.record.password)
      if(match){
        return{
          success: true,
          record: user.record,
          code:200
        }
      }
      else{
        return{
          success: false,
          code: 409,
          error: "Incorrect Password"
        }
      }
    }else{
      return{
        success: false,
        code: 404,
        error: user.error
      }
    }
  }catch(err){
  console.log("Error", err.message);
  return{
    success: false,
    code: 500,
    error: "Unexpected Error"
  }
}
}

exports.resetPassword = async(email, newPassword) =>{
  try{
    email = email.toLowerCase()
    let user =  await this.isExist({ email })
    let saltrounds=5;
    if(user.success){
      let hashedpassword = await bcrypt.hash(newPassword, saltrounds)
      await User.findOneAndUpdate({email}, {password: hashedpassword})
      return{
        success: true,
        code:200
      };
    }else return{
      success: false,
      code:404,
      error: user.error
    }
  }catch(err){
    console.log("Error", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error"
    }
  }
}