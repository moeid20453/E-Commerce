const User = require('../../modules/user/User.repo')


const getUser = async(req,res)=>{
  try{
    let id = req.params.id
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

module.exports={
  getUser
}