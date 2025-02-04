import express from "express";
import ReviewController from "../controllers/reviewController.js.js";

const router = express.Router();

router.post("/:movieId", ReviewController.createReview);
router.get("/", ReviewController.getReviews);
router.get("/:id", ReviewController.getReviewById);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

export default router;
