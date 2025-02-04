import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

class ReviewController {
  static async createReview(req, res, next) {
    try {
      const { movieId } = req.params;
      const { user, rating, comment } = req.body;

      if (!user || rating === undefined || rating < 0 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Invalid rating or missing fields." });
      }

      const existingReview = await Review.findOne({ user, movie: movieId });
      if (existingReview) {
        return res
          .status(400)
          .json({ message: "User has already reviewed this movie." });
      }

      const newReview = new Review({ user, movie: movieId, rating, comment });
      await newReview.save();

      const reviews = await Review.find({ movie: movieId });
      const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = reviews.length ? totalRatings / reviews.length : 0;

      await Movie.findByIdAndUpdate(movieId, { averageRating });

      res
        .status(201)
        .json({ message: "Review added successfully!", review: newReview });
    } catch (error) {
      next(error);
    }
  }

  static async getReviews(req, res, next) {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }

  static async getReviewById(req, res, next) {
    try {
      const { id } = req.params;
      const review = await Review.findById(id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  }

  static async updateReview(req, res, next) {
    try {
      const { id } = req.params;
      const { user, rating, comment } = req.body;

      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { user, rating, comment },
        { new: true }
      );

      res.status(200).json({
        message: "Review updated successfully",
        review: updatedReview,
      });
    } catch (error) {
      next(error);
    }
  }

  static deleteReview = async (req, res, next) => {
    try {
      const { id } = req.params;

      await Review.findByIdAndDelete(id);

      res.status(200).send({ message: "Review deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default ReviewController;
