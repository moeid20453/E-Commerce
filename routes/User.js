// const app = require('express').Router()
// const {
//   authenticateUser,
//   authorizePermissions,
// } = require('../middleware/authentication');
// const {
//   getAllUsers,
//   getSingleUser,
//   showCurrentUser,
//   updateUser,
//   updateUserPassword,
// } = require('../controllers/userController');

// app
//   .route('/getAllUsers')
//   .get(authenticateUser, authorizePermissions('admin'), getAllUsers);

// app.route('/showMe').get(authenticateUser, showCurrentUser);
// app.route('/updateUser').patch(authenticateUser, updateUser);
// app.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

// app.route('/:id').get(authenticateUser, getSingleUser);

// module.exports = app;