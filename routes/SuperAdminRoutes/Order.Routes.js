const app = require("express").Router();
const { authenticateUser } = require("../../middleware/authentication");
const { createOrder } = require("../../controllers/Client/Index.controller");

app.post("/Create-Order", authenticateUser, createOrder);

module.exports = app;
