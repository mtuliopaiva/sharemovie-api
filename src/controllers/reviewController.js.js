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

  // static async getMovies(req, res, next) {
  //   try {
  //     const movies = await Movie.find();
  //     res.status(200).json(movies);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async getMovieById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const movie = await Movie.findById(id);
  //     if (!movie) {
  //       return res.status(404).json({ message: "Movie not found" });
  //     }
  //     res.status(200).json(movie);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async updateMovie(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const { title, synopsis, director, duration, categories } = req.body;

  //     const updatedMovie = await Movie.findByIdAndUpdate(
  //       id,
  //       { title, synopsis, director, duration, categories },
  //       { new: true, runValidators: true }
  //     );

  //     if (!updatedMovie) {
  //       return res.status(404).json({ message: "Movie not found" });
  //     }

  //     res
  //       .status(200)
  //       .json({ message: "Movie updated successfully.", movie: updatedMovie });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

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
