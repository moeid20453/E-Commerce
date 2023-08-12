const app = require("express").Router();
const { addUserValidation, confirmPasswordVlidation, updateUserValidation} = require('../../validation/User.Validation')
const {validator} = require('../../validation/Common.validator')
const {
  login,
  logout,
} = require("../../controllers/Admin/Index.Controller");

app.post("/login", login);
app.get("/logout", logout);

module.exports = app;
