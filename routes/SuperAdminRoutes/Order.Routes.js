const app = require("express").Router();
const { authenticateUser } = require("../../middleware/authentication");
const {
  createOrder,
} = require("../../controllers/SuperAdmin/Index.Controller");

app.post("/Create-Order", authenticateUser, createOrder);

module.exports = app;
