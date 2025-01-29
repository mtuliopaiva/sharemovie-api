import express from "express";
import MovieController from "../controllers/movieController.js";

const router = express.Router();

router.post("/", MovieController.createMovie);

export default router;
