const app = require("express").Router();

app.use("/Profile", require("./Profile.Routes"));
app.use("/Cart", require("./Cart.Routes"));
app.use("/Orders", require("./Order.Routes"));
app.use("/Reviews", require("./Review.Routes"));
app.use("/Auth", require("./User.Auth.Routes"));

module.exports = app;
