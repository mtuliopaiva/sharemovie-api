import express from "express";
import userRoutes from "./userRoutes.js";
import movieRoutes from "./movieRoutes.js";
import reviewsRoutes from "./reviewRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/reviews", reviewsRoutes);

export default router;
