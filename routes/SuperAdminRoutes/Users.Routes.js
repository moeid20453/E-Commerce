const {
  authenticateUser,
  authorizePermissions
} = require('../../middleware/authentication');
const { 
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser} = require("../../controllers/SuperAdmin/Index.Controller")

app.get('/user/:id ',authenticateUser,getUser)
app.get('/getAllUsers',authenticateUser,authorizePermissions("superAdmin"),getAllUsers)
app.post('/getAllUsers',authenticateUser,authorizePermissions("superAdmin"),deleteUser)
app.post('/getAllUsers',authenticateUser,authorizePermissions("superAdmin"),updateUser)
app.post('/getAllUsers',authenticateUser,authorizePermissions("superAdmin"),createUser)


module.exports = app;