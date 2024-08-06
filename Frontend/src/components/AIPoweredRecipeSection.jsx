import React, {useState}from 'react';
import '../index.css';
import AIPoweredImage from '../assets/images/AI-Generated-Section-Image.webp';
import { FiCheckCircle } from 'react-icons/fi';
import LoginModal from '../modal/LoginModal';
import { useNavigate } from 'react-router-dom';

const AIPoweredRecipeSection = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Function to check if a user is logged in
  const isUserLoggedIn = () => {
    return !!JSON.parse(localStorage.getItem('user'));
  };

  // Handler for the Generate Recipe button click
  const handleGenerateRecipe = () => {
    if (isUserLoggedIn()) {
      navigate('/recipe-maker'); // Redirect to recipe-maker page
    } else {
      setLoginModalOpen(true); // Open the login modal if not logged in
    }
  };

  const handleLoginSuccess = () => {
    navigate('/recipe-maker');
  };
  
  return (
    <>
    <section className="py-12 px-4 lg:px-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Generate Delicious Recipes with AI
          </h2>
          <p className="text-lg text-gray-700 mb-4 mt-10">
          Experience limitless possibilities with recipes that cater to your dietary preferences, generated from your on-hand ingredients.
          </p>
          <div className="flex flex-col mb-6 mt-10">
          <div className="flex items-center mb-2">
              <FiCheckCircle className="text-green-500 mr-2" size={30} />
              <p>
              <span className="font-bold">Never Ending Variety.</span> Explore limitless recipe possibilities, tailored to your unique taste and preference.
              </p>
            </div>
            <div className="flex items-center mb-2 mt-10">
              <FiCheckCircle className="text-green-500 mr-2" size={30} />
              <p>
              <span className="font-bold">Ingredient-Based Creativity.</span>Unlock culinary creativity with AI-generated recipes, specifically crafted from your available ingredients.
              </p>
              
            </div>
            <div className="flex items-center mb-2 mt-10">
              <FiCheckCircle className="text-green-500 mr-2" size={30} />
              <p>
              <span className="font-bold">Your Diet, Your Way.</span>Explore a limitless range of recipes, each one tailored to meet your specific dietary needs.
              </p>
            </div>
          </div>
          <button className="bg-greenColor text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300" onClick={handleGenerateRecipe}>
            Try it Now
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2">
          <img src={AIPoweredImage} alt="AI Recipe Generation" className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
    {isLoginModalOpen && (
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess} // Pass the function to handle successful login
      />
    )}
    </>
  );
};

export default AIPoweredRecipeSection;
