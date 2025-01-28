import User from "../models/User.js";

class UserController {
  static async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Fields are required." });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "E-mail already exists" });
      }

      const newUser = new User({ name, email, password });
      await newUser.save();

      res
        .status(201)
        .json({ message: "User created successfully.", user: newUser });
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      if (!name && !email && !password) {
        return res
          .status(400)
          .json({ message: "At least one field is required for update." });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User updated successfully.", user: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  static deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      await User.findByIdAndDelete(id);

      res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
