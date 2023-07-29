const app = require('express').Router()

const {register, login,logout,activateUser} = require('../../controllers/Client/Index.controller')

app.post('/register', register);
app.post('/login', login);
app.get('/activate-User/:token', activateUser)
app.get('/logout', logout);



module.exports = app;