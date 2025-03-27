const User = require('../../modules/user/User.repo')
const Util = require("../../utilities")


const login = async(req,res)=>{
  try{
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({error: "Please provide email and password"});
    }
    let user = await User.comparePassword(email, password)
    if(user.record.success == true){
      // Create JWT token and attach to cookie
      Util.attachCookiesToResponse(res, user.record._id);
      res.status(user.code).json(user.record);
    }else{
      res.status(user.code).json(user.record);
    }

  }catch{
    res.status(500).json({error:"Unexpected error"})
  }
}

const logout = async(req,res)=>{
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out!" });
}

module.exports = {
  login,
  logout
}