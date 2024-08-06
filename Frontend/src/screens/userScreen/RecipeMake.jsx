import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContactBannerImage from '../../assets/images/recipe-make-bg-2.jpg';

const RecipeMake = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRecipeName(e.target.value);
  };

  const createRecipe = async (recipeData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const formattedRecipeData = {
        recipeName: recipeData.name,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        imageUrl: recipeData.image,
      };
  
      const { data } = await axios.post('http://localhost:7000/api/create-user-recipe', formattedRecipeData, config);
      
     const updatePointsResponse = await axios.post('http://localhost:7000/api/update-points', {
      userId: user._id,
      points: user.points,
    }, config);

    console.log('Points updated successfully:', updatePointsResponse.data);

  } catch (error) {
    console.error('Error creating recipe or updating points:', error);
  }
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      setLoginModalOpen(true);
      setLoading(false);
      return;
    }

    if (user.points <= 0) {
      navigate('/checkout');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          query: recipeName,
          number: 1,
          apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
        },
      });

      if (response.data.results.length === 0) {
        setError('No recipes found for your query. Please try a different recipe name.');
        setLoading(false);
        return;
      }

      const recipeId = response.data.results[0].id;
      const recipeResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
        params: {
          apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
        },
      });

      const recipeData = {
        name: recipeResponse.data.title,
        ingredients: recipeResponse.data.extendedIngredients.map((ingredient) => ingredient.original),
        instructions: recipeResponse.data.instructions,
        image: recipeResponse.data.image,
      };

      await createRecipe(recipeData);

      setRecipes((prevRecipes) => [...prevRecipes, recipeData]);

      user.points -= 100;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError('Error fetching recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 grid grid-cols-4 gap-2 bg-cover bg-center filter blur-sm" style={{ backgroundImage: `url(${ContactBannerImage})`}}>
      </div>
      <div className="relative z-10 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg p-8 rounded-lg shadow-2xl border border-white/30 max-w-xl w-1/2">
        <h1 className="text-4xl font-bold text-center text-white mb-6 drop-shadow-lg">Create Your Recipe</h1>
        <form onSubmit={handleFormSubmit} className="mb-6">
          <label className="block text-white text-lg font-semibold mb-2 drop-shadow-lg" htmlFor="recipeName">
            What recipe do you want to make?
          </label>
          <input
            className="w-full px-4 py-2 border-none rounded-lg mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-inner bg-white/80"
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={handleInputChange}
            placeholder="Enter recipe name"
            required
          />
          <button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transform hover:scale-105 transition-transform"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Recipe...' : 'Create Recipe'}
          </button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {recipes && recipes.length > 0 && (
          <div className="bg-gray-100 bg-opacity-50 p-6 rounded-lg shadow-inner mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Recipe:</h2>
            {recipes.map((recipe, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{recipe.name}</h3>
                <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong></p>
                <div
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                  className="mt-2 text-gray-800"
                />
                {recipe.image && <img src={recipe.image} alt={recipe.name} className="w-full h-auto mt-2 rounded-lg shadow-sm" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeMake;
