import express from "express";
import MovieController from "../controllers/movieController.js";

const router = express.Router();

router.post("/", MovieController.createMovie);
router.get("/", MovieController.getMovies);
router.get("/:id", MovieController.getMovieById);
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);

export default router;
