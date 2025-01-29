import express from "express";
import userRoutes from "./userRoutes.js";
import movieRoutes from "./movieRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);

export default router;
