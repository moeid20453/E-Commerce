const express = require("express");
const app = express();
require("dotenv").config();
let path = require("path");
const session = require("./utilities/session");
let staticFiles = path.join(__dirname, "public");
let bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let connection = require("./connection/db.connection");
connection();
app.use(cookieParser());
app.set("view engine", "ejs");

const SupeAdminRoutes = require("./routes/SuperAdminRoutes/Index.Routes");
const AdminRoutes = require("./routes/AdminRoutes/Index.Routes");
const UserRoutes = require("./routes/UserRoutes/Index.Routes");

app.use(express.static(staticFiles));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session);

app.use("/SuperAdmin", SupeAdminRoutes);
app.use("/Admin", AdminRoutes);
app.use("/", UserRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
