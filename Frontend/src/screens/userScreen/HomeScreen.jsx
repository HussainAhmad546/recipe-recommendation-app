import React from 'react'
import Slider from '../../components/Slider'
import recipes from '../../data/recipes'
import popularCategoriesImages from '../../data/popularCategories'
import RecipeMake from './RecipeMake'
import AIPoweredRecipeSection from '../../components/AIPoweredRecipeSection'
import PricingTable from '../../components/PricingTable'

const Home = ({isLoginModalOpen ,setLoginModalOpen}) => {
  return (
    <>
      <Slider isLoginModalOpen={isLoginModalOpen} setLoginModalOpen={setLoginModalOpen}/>
      <div className="popular-categories container mx-auto mt-24 mb-16">
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>Popular Categories</h1>
        <div className="img flex flex-wrap mx-auto container justify-center">
          {popularCategoriesImages.map((category, index) => (
            <div key={index} className="flex flex-col items-center mx-4 mb-4">
              <img
                src={category.image}
                alt={category.name}
                height={200}
                width={150}
                className='transform scale-100 transition-all ease-in-out duration-800 hover:scale-110 rounded-full'
                />
              <p className='mt-2 text-center text-gray-800 font-semibold hover:text-greenColor'>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
          <AIPoweredRecipeSection/>
          <PricingTable/>

      <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Popular Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 hover:text-greenColor">{recipe.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
