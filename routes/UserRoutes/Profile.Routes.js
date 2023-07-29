const {
  authenticateUser
} = require('../../middleware/authentication');
const { getUser} = require("../../controllers/Client/Index.controller")

app.get('/user/:id ',authenticateUser,getUser)

module.exports = app;