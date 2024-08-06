import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user.token) {
                    console.error('User not logged in or no token available');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const response = await axios.get(`http://localhost:7000/api/get-recipe/${id}`, config);
                setRecipe(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div className="bg-gray-100 py-10 ">
            <div className="mx-auto px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center mb-4">{recipe.recipeName}</h1>
                    <div className="flex justify-center mb-6">
                        <img src={recipe.imageUrl || 'default_image_url'} alt={recipe.recipeName} className="rounded-lg shadow-lg w-full h-64 sm:h-80 lg:h-96 object-cover" />
                    </div>
                    <div className="mb-6 text-gray-700">
                        <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
                        <p>{recipe.ingredients}</p>
                    </div>
                    <div className="mb-6 text-gray-700">
                        <h2 className="text-2xl font-bold mb-2">Instructions</h2>
                        <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;
