import express from "express";
import {
  createRecipe,
  getUserRecipes,
  getUserRecipesById,
} from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create-user-recipe").post(protect, createRecipe);
router.route("/get-user-recipe").get(protect, getUserRecipes);
router.get('/get-recipe/:id', protect, getUserRecipesById);


export default router;
