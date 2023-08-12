const app = require("express").Router();

app.use("/Cart", require("./Cart.Routes"));
app.use("/Orders", require("./Order.Routes"));
app.use("/Reviews", require("./Review.Routes"));
app.use("/Auth", require("./User.Auth.Routes"));
app.use("/User", require("./Users.Routes"));
app.use("/Admin", require("./Admin.Routes"));

module.exports = app;
