const app = require("express").Router();
const { authenticateUser } = require("../../middleware/authentication");
const {
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReviews,
} = require("../../controllers/Client/Index.controller");

app.get("/user/:id ", authenticateUser, getSingleUserReviews);
app.get("/product/:id", authenticateUser, getSingleProductReviews);
app.get("/:id", authenticateUser, getSingleReview);
app.post("/create", authenticateUser, createReview);
app.put("/update", authenticateUser, updateReview);
app.delete("/delete/:id", authenticateUser, deleteReview);

module.exports = app;
