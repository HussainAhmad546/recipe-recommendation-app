import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 
import BannerImage from '../assets/images/HeaderImage.jpg';
import LoginModal from '../modal/LoginModal';

const HeroSection = ({isLoginModalOpen ,setLoginModalOpen}) => {
  const navigate = useNavigate();
    const isLoggedin = JSON.parse(localStorage.getItem('user'));
  const handleGenerateRecipe = () => {
   console.log("isLoggedinisLoggedin",isLoggedin)
    if (isLoggedin) {
      navigate('/recipe-maker'); 
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    navigate('/recipe-maker');
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-between py-12 px-4 lg:px-8 bg-cover bg-center" style={{backgroundImage: `url(${BannerImage})`, width:'100%' , height:'600px'}}>
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-20">
          <h1 className="text-3xl lg:text-5xl font-bold text-black mb-6">
            Discover and Create Your Favorite Recipes
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore a wide range of delicious recipes and bring joy to your cooking experience. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, amet iusto voluptate magnam delectus ipsam dolorem voluptatibus illo adipisci aut praesentium ipsa quos nulla ratione impedit recusandae soluta. Molestias, laborum. 
          </p>
          <button
            onClick={handleGenerateRecipe}
            className="bg-greenColor text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
          >
            Generate Recipe
          </button>
        </div>
      </section>
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          loginwithGenerteButoon={true}
        />
      )}
    </>
  );
};

export default HeroSection;
