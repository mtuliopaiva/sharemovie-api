import express from "express";
import ReviewController from "../controllers/reviewController.js.js";

const router = express.Router();

router.post("/:movieId", ReviewController.createReview);
// router.get("/", UserController.getUsers);
// router.get("/:id", UserController.getUserById);
// router.put("/:id", UserController.updateUser);
router.delete("/:id", ReviewController.deleteReview);

export default router;
