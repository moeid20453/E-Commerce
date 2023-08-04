const app = require("express").Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../../middleware/authentication");
const {
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReviews,
} = require("../../controllers/SuperAdmin/Index.Controller");

app.get(
  "/user/:id ",
  authenticateUser,
  authorizePermissions("superAdmin"),
  getSingleUserReviews
);
app.get(
  "/product/:id",
  authenticateUser,
  authorizePermissions("superAdmin"),
  getSingleProductReviews
);
app.get(
  "/:id",
  authenticateUser,
  authorizePermissions("superAdmin"),
  getSingleReview
);
app.post(
  "/create",
  authenticateUser,
  authorizePermissions("superAdmin"),
  createReview
);
app.put(
  "/update",
  authenticateUser,
  authorizePermissions("superAdmin"),
  updateReview
);
app.delete(
  "/delete/:id",
  authenticateUser,
  authorizePermissions("superAdmin"),
  deleteReview
);

module.exports = app;
