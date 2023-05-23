const User = require("../modules/user/User.Model");
const bcrypt = require("bcrypt")
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createJWT,
  verifyToken,
  SendMail,
} = require("../utilities");

const register = async (req, res) => {
  
  const emailAlreadyExists = await User.findOne({ email: req.body.email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const user = new User(req.body);

  const tokenUser =  createJWT(user.id);

  await user.save()

  var activationLink = `http://localhost:3000/activateUser/${tokenUser}`;
  var reciever = req.body.email;
  var subject = "Email Activation :D";
  var text =
    "You have created, Please click this link to activate your account";
  var html = `<a> ${activationLink} </a>`;
  await SendMail(reciever, subject, text, html);

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

let activateUser = async (req, res) => {
  let token = req.params.token;
  const  userId  = verifyToken(token);
  console.log(userId);
  if (userId) {
    await User.findByIdAndUpdate(userId, { isActive: true });
    res.status(200).json({ message: "successfully Activated your Account" });
  } else {
    res.status(400).json({ message: "Incorrect Token" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  req.session.cookie.expires = new Date(Date.now() + day);
  req.session.cookie.maxAge = day
  req.session.user = user;
  await req.session.save();

  attachCookiesToResponse( res, user.id  );

  res.status(StatusCodes.OK).json({ user: user });
};
const logout = async (req, res) => {
  req.session.destroy(()=>{
    res.clearCookie("token",{
      sameSite:"none",
      secure:true
     })
  })
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  activateUser,
  login,
  logout,
};
