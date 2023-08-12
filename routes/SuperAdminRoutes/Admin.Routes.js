const app = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../../middleware/authentication");

const {
  getAllAdmins,
  getAdminUser,
  deleteAdminUser,
  updateAdminUser,
  createAdminUser,
} = require("../../controllers/SuperAdmin/Index.Controller");

app.get(
  "/AllAdmins",
  authenticateUser,
  authorizePermissions("superAdmin"),
  getAllAdmins
);

app.get(
  "/:id",
  authenticateUser,
  authorizePermissions("superAdmin"),
  getAdminUser
);

app.delete(
  "/Delete",
  authenticateUser,
  authorizePermissions("superAdmin"),
  deleteAdminUser
);

app.put(
  "/Update",
  authenticateUser,
  authorizePermissions("superAdmin"),
  updateAdminUser
);

app.post(
  "/Create",
  authenticateUser,
  authorizePermissions("superAdmin"),
  createAdminUser
);

module.exports = app;
