const app = require("express").Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../middleware/authentication");
const {
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReviews,
} = require("../../controllers/Admin/Index.Controller");

app.get(
  "/user/:id ",
  authenticateUser,
  authorizeRoles("superAdmin"),
  getSingleUserReviews
);
app.get(
  "/product/:id",
  authenticateUser,
  authorizeRoles("superAdmin"),
  getSingleProductReviews
);
app.get(
  "/:id",
  authenticateUser,
  authorizeRoles("superAdmin"),
  getSingleReview
);
app.post(
  "/create",
  authenticateUser,
  authorizeRoles("superAdmin"),
  createReview
);
app.put(
  "/update",
  authenticateUser,
  authorizeRoles("superAdmin"),
  updateReview
);
app.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("superAdmin"),
  deleteReview
);

module.exports = app;
