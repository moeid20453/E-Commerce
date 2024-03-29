const app = require("express").Router();
const { addUserValidation, confirmPasswordVlidation, updateUserValidation} = require('../../validation/User.Validation')
const {validator} = require('../../validation/Common.validator')
const {
  authenticateUser,
  authorizePermissions,
} = require("../../middleware/authentication");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} = require("../../controllers/SuperAdmin/Index.Controller");

app.get("/user/:id ", authenticateUser, getUser);
app.get(
  "/getAllUsers",
  authenticateUser,
  authorizePermissions("superAdmin"),
  getAllUsers
);
app.delete(
  "/delete",
  authenticateUser,
  authorizePermissions("superAdmin"),
  deleteUser
);
app.put(
  "/Update",
  authenticateUser,
  authorizePermissions("superAdmin"),
  updateUser
);
app.post(
  "/Create",
  authenticateUser,
  authorizePermissions("superAdmin"),
  createUser
);

module.exports = app;
