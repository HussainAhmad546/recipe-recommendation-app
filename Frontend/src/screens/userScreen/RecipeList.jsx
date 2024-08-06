import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.token) {
                console.error('User not logged in or no token available');
                return;
            }
    
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
    
                const response = await axios.get('http://localhost:7000/api/get-user-recipe', config); 
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
    
        fetchRecipes();
    }, []);

    return (
        <div className="bg-gray-200 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Generated Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-8">
                    {recipes.length > 0 ? (
                        recipes.map((recipe, index) => (
                            <div
                                key={index}
                                className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300 hover:opacity-40"></div>
                                <div className="relative">
                                    <img src={recipe.imageUrl} alt={recipe.recipeName} className="w-full h-56 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-green-600 transition-colors duration-300">{recipe.recipeName}</h3>
                                        <p className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: `${recipe.instructions.substring(0, 150)}...` }} />
                                        <Link to={`/recipe/${recipe._id}`} className="inline-block mt-4 text-green-500 font-semibold hover:text-green-600 transition-colors duration-300">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeList;
