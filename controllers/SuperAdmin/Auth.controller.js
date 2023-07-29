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
      req.session.cookie.expires = new Date(Date.now() + day);
      req.session.cookie.maxAge = day
      req.session.user = user;
      await req.session.save();
      Util.attachCookiesToResponse(res, user.record._id  );
      res.status(user.code).json(user.record);
    }else{
      res.status(user.code).json(user.record);
    }

  }catch{
    res.status(500).json({error:"Unexpected error"})
  }
}
const logout = async(req,res)=>{
    req.session.destroy(()=>{
      res.clearCookie("token",{
        sameSite:"none",
        secure:true
       })
    })
    res.status(200).json({ msg: "user logged out!" });
}

module.exports = {
  login,
  logout
}