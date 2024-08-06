import Recipe from '../models/recipeModel.js';

export const createRecipe = async (req, res) => {
    const { recipeName, ingredients, instructions, imageUrl } = req.body;

    try {
        const recipe = new Recipe({
            user: req.user._id,
            recipeName,
            ingredients,
            instructions,
            imageUrl,
        });

        const createdRecipe = await recipe.save();
        res.status(201).json(createdRecipe);
    } catch (error) {
        res.status(400).json({ message: 'Error creating recipe', error: error.message });
    }
};


export const getUserRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user._id });
        res.json(recipes);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching recipes', error: error.message });
    }
}



export const getUserRecipesById =async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe details', error: error.message });
    }
}