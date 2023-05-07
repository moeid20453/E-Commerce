const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  SendMail,
  IsTokenValid,
} = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const user = await User.create({ name, email, password });

  let activationLink = `http://localhost:3000/activateUser/${userActivationToken}`;
  let receiver = req.body.email;
  let subject = "Email Activation :D";
  let text =
    "You have created, Please click this link to activate your account";
  let html = `<a> ${activationLink} </a>`;
  await SendMail(receiver, subject, text, html);
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

let activateUser = async (req, res) => {
  let token = req.params.token;
  const { name, userId, role } = IsTokenValid(token);

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
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  activateUser,
  login,
  logout,
};
