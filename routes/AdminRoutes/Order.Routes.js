const app = require("express").Router();
const { authenticateUser } = require("../../middleware/authentication");
const { createOrder } = require("../../controllers/Admin/Index.Controller");

app.post("/Create-Order", authenticateUser, createOrder);

module.exports = app;
