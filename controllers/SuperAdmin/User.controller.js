const User = require('../../modules/user/User.repo')
const Wish = require("../../modules/wishlist/Wishlist.repo")

  const createUser = async(req,res)=>{
    try{
      const {FirstName, LastName, Email, Password, Address} = req.body.form
      let user = {firstName:FirstName,
        lastName: LastName,
        password: Password,
        email: Email,
        active: true,
        address: Address,
        role: "user"}
      let create = await User.create(user);
      if(create.success == true){
        await Wish.create(create.record._id)
        res.status(create.code).json({user: create.record})
      }else{
        res.status(create.code).json({error: create.error})
      }
    } catch{
      res.status(500).json({error: "Unexpected error"})
    }
  }

  const updateUser = async(req,res)=>{
    try{
      let form = req.body.form
      let id = req.body.id
      let update = await User.update(id, form)
      if(update.success == true){
        res.status(update.code).json({user: update.record})
      }else{
        res.status(update.code).json({error: update.error})
      }
    }catch{
      console.log("Unexpected Error");
      res.status(500).json({error: "Unexpected Error"})
    }
  }

  const deleteUser = async(req,res)=>{
    try{
      const id = req.body.id
      let deletedUser = await User.remove(id)
      if(deletedUser.success == true){
        res.status(deletedUser.code).json(deletedUser.record)
      }else{
        res.status(deletedUser.code).json(deletedUser.error)
      }
    }catch{
      res.status(500).json({error: "Unexpected error"})
    }
  }

  const getUser = async(req,res)=>{
    try{
      let id = req.body.id
      let user = await User.get({_id: id})
      if(user.success == true){
        res.status(user.code).json(user.record)
      }else{
        res.status(user.code).json(user.error)
      }
    }catch{
      res.status(500).json({error: "Unexpected error in the admin controller"})
    }
  }
  
  const getAllUsers = async(req,res)=>{
    try{

      let role = "user"
      let list = await User.list({role:role})
      if(list.success == true){
        res.status(update.code).json({user: update.record})
      }else{
        res.status(update.code).json({error: update.error})
      }
    }catch{
      console.log("Unexpected Error");
      res.status(500).json({error: "Unexpected Error"})
    }
  }


module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser
}