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

  // static async getUsers(req, res, next) {
  //   try {
  //     const users = await User.find().select("-password");
  //     res.status(200).json(users);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async getUserById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const user = await User.findById(id).select("-password");
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //     res.status(200).json(user);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async updateUser(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const { name, email, password } = req.body;

  //     if (!name && !email && !password) {
  //       return res
  //         .status(400)
  //         .json({ message: "At least one field is required for update." });
  //     }

  //     const updatedUser = await User.findByIdAndUpdate(
  //       id,
  //       { name, email, password },
  //       { new: true, runValidators: true }
  //     );

  //     if (!updatedUser) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     res
  //       .status(200)
  //       .json({ message: "User updated successfully.", user: updatedUser });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static deleteUser = async (req, res, next) => {
  //   try {
  //     const { id } = req.params;

  //     await User.findByIdAndDelete(id);

  //     res.status(200).send({ message: "User deleted successfully" });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default MovieController;
