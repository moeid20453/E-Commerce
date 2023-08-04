const createReview = async (req, res) => {
  try {
    const { userId, productId, Rating, Title, Comment } = req.body.form;
    const form = {
      userid: userId,
      rating: Rating,
      title: Title,
      comment: Comment,
      product: productId,
    };

    const review = await Review.create(form);
    if (review.success == true) {
      res.status(review.code).json({ review: review.record });
    } else {
      res.status(review.code).json({ error: review.error });
    }
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const getSingleReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ reviewId: reviewId });

    if (review.success == false) {
      res.json(review.code).json({ error: review.error });
    }
    res.status(review.code).json({ review: review.data });
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;
    const { rating, title, comment } = req.body;
    const form = { rating: rating, title: titleitle, comment: comment };

    const review = await Review.update(reviewId, form);

    if (review.success == false) {
      res.json(review.code).json({ error: review.error });
    }

    res.status(review.code).json({ review: review.data });
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params;

    const review = await Review.delete({ ReviewId: reviewId });
    if (review.success == false) {
      res.json(review.code).json({ error: review.error });
    }
    res.status(review.code).json({ review: review.data });
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};
const getSingleUserReviews = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const reviews = await Review.get({ userId: userId });
    if (reviews.success == false) {
      res.json(reviews.code).json({ error: reviews.error });
    }
    res.status(reviews.code).json({ review: reviews.data });
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const getSingleProductReviews = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const reviews = await Review.get({ productId: productId });
    if (reviews.success == false) {
      res.json(reviews.code).json({ error: reviews.error });
    }
    res.status(reviews.code).json({ review: reviews.data });
  } catch {
    res.status(500).json({ error: "Unexpected error" });
  }
};

module.exports = {
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReviews,
};
