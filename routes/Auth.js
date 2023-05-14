const app = require('express').Router()
const  {
login,
logout,
register,
activateUser,
} = require('../controllers/auth')

app.get('/activateUser/:token', activateUser)
app.post('/register', register)
app.post('/login', login);
app.get('/logout', logout)
module.exports = app;