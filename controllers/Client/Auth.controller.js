const User = require('../../modules/user/User.repo')
const Cart = require('../../modules/Cart/Cart.repo')
const Util = require("../../utilities")
const bcrypt = require("bcrypt")
const {
  attachCookiesToResponse,
  createJWT,
  verifyToken,
  SendMail,
} = require("../../utilities");



const register = async (req, res) => {
  try{
    const user =  await User.create(req.body);
    if (user.success == false) {
      res.status(user.code).json(user.error);
    }else{
      const tokenUser =  createJWT(user.record._id);
      var activationLink = `http://localhost:3000/activateUser/${tokenUser}`;
      var reciever = req.body.email;
      var subject = "Email Activation :D";
      var text =
        "You have created, Please click this link to activate your account";
      var html = `<a> ${activationLink} </a>`;
      Cart.create(user.record._id)
      await SendMail(reciever, subject, text, html);
      attachCookiesToResponse({ res, user: tokenUser });
      res.status(user.code).json({ user: tokenUser });
    }
}catch{
  res.status(500).json({error: "Unexpected error"})
}
}

let activateUser = async (req, res) => {
  let token = req.params.token;
  const  userId  = verifyToken(token);
  if (userId) {
    await User.update(userId, { isActive: true });
    res.status(200).json({ message: "successfully Activated your Account" });
  } else {
    res.status(400).json({ message: "Incorrect Token" });
  }
};

const login = async(req,res)=>{
  try{
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({error: "Please provide email and password"});
    }
    let user = await bcrypt.comparePassword(email, password)
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
let updateUser = async (req, res) =>{
  let userid = req.params.id;
  let form = req.body
  let user = await User.update(userid,form)
  res.status(200).json({message: "successfully Updated :D new data is ", user})
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
  logout,
  updateUser,
  login,
  activateUser,
  register
}