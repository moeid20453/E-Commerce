const app = require("express").Router();

const {
  authenticateUser,
  isAdmin,
} = require("../../middleware/authentication");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} = require("../../controllers/Admin/Index.Controller");

app.get("/user/:id ", authenticateUser, getUser);
app.get("/getAllUsers", authenticateUser, isAdmin, getAllUsers);
app.delete("/Delete", authenticateUser, isAdmin, deleteUser);
app.put("/Update", authenticateUser, isAdmin, updateUser);
app.post("/Create", authenticateUser, isAdmin, createUser);

module.exports = app;
