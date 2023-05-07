const express = require("express")
const app = express();
require("dotenv").config();
let path = require("path");
let staticFiles = path.join(__dirname, "public");
let connection = require("./connection/db.connection")
let bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
connection();
const productRoutes = require('./routes/Products')
app.use(express.static(staticFiles));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());





app.use('/api',productRoutes);


app.listen(process.env.PORT, () =>{
  console.log(`server is running on port ${process.env.PORT}`);
})