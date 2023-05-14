let session = require("express-session")
let mongoSessoinStore = require("connect-mongodb-session")(session)

let sessionStore = new mongoSessoinStore({
  uri: process.env.CONNECTION_URL,
  collection: 'UserSessions'
});


sessionStore.on("error", (error)=>{
  console.log(`mongo Session Store Error`, error);
});


module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: false}

})