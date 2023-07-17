const User = require('../../modules/user/User.repo')


  const createAdminUser = async(req,res)=>{
    try{
      const {FirstName, LastName, Email, Password, Address} = req.body.form
      let user = {firstName:FirstName,
        lastName: LastName,
        password: Password,
        active: true,
        address: Address,
        role: "admin"} 

      let create = await User.create(user);
      if(create.success == true){
        res.status(create.code).json({user: create.record})
      }else{
        res.status(create.code).json({error: create.error})
      }
    } catch{
      res.status(500).json({error: "Unexpected error"})
    }
  }

  const updateAdminUser = async(req,res)=>{
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

  const deleteAdminUser = async(req,res)=>{
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

  const getAdminUser = async(req,res)=>{
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
  
  const getAllAdmins = async(req,res)=>{
    try{

      let admin = "admin"
      let list = await User.list({role:admin})
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


  