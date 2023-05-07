const mongoose = require("mongoose");

const connection = () =>{
  return mongoose.connect(process.env.CONNECTION_URL)
  .then(()=>{
    console.log("database  Connection succesful");
  }).catch((error)=>{
    console.error("database connectoin error"+ error);
  })
}
module.exports = connection;