const app = require("express").Router();
const { authenticateUser } = require("../../middleware/authentication");
const { getUser } = require("../../controllers/Client/Index.controller");

app.get("/:id ", authenticateUser, getUser);

module.exports = app;
