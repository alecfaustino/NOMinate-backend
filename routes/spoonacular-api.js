import express from "express";
import axios from "axios";
// API Documentation: https://spoonacular.com/food-api/docs
const RECIPES_BASE_URL = "https://api.apilayer.com/spoonacular/recipes";

const router = express.Router();

// fetch with filters -- main use now

router.get("/search", async (req, res) => {
  const apikey = process.env.SPOON_API_KEY;
  try {
    const response = await axios.get(`${RECIPES_BASE_URL}/complexSearch`, {
      headers: {
        apikey,
      },
      params: {
        number: 5,
        addRecipeInformation: true,
        addRecipeInstructions: true,
        addRecipeNutrition: true,
        sort: "random",
        instructionsRequired: true,
        includeIngredients: true,
        ...req.query,
      },
    });
    const data = response.data;

    res.status(200).json({ message: "recipes fetched: ", data });
  } catch (error) {
    console.error(
      "Spoonacular API error:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      message: "Failed to fetch recipes",
      error: error.response?.data || error.message,
    });
  }
});

export default router;
