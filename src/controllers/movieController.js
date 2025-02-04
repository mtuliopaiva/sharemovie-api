import Movie from "../models/Movie.js";

class MovieController {
  static async createMovie(req, res, next) {
    try {
      const { title, synopsis, director, duration, categories } = req.body;

      if (!title || !synopsis || !director || !duration || !categories) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingMovie = await Movie.findOne({ title });
      if (existingMovie) {
        return res.status(400).json({ message: "This title already exists" });
      }

      const newMovie = new Movie({
        title,
        synopsis,
        director,
        duration,
        categories,
      });
      await newMovie.save();

      res
        .status(201)
        .json({ message: "Movie created successfully.", movie: newMovie });
    } catch (error) {
      next(error);
    }
  }

  static async getMovies(req, res, next) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { title, synopsis, director, duration, categories } = req.body;

      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        { title, synopsis, director, duration, categories },
        { new: true, runValidators: true }
      );

      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      res
        .status(200)
        .json({ message: "Movie updated successfully.", movie: updatedMovie });
    } catch (error) {
      next(error);
    }
  }

  static deleteMovie = async (req, res, next) => {
    try {
      const { id } = req.params;

      await Movie.findByIdAndDelete(id);

      res.status(200).send({ message: "Movie deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default MovieController;
