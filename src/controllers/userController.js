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
}

export default UserController;
