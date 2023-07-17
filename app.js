const express = require("express");
const app = express();
require("dotenv").config();
let path = require("path");
const session = require("./utilities/session")
let staticFiles = path.join(__dirname, "public");
let bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let connection = require("./connection/db.connection");
connection();

app.use(cookieParser())









const productRoutes = require("./routes/Products");
const authRoutes = require("./routes/Auth")
const testRoutes = require('./routes/test')
app.use(express.static(staticFiles));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session)
// app.use("/api", productRoutes);
// app.use("/auth", authRoutes)
app.use(testRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
