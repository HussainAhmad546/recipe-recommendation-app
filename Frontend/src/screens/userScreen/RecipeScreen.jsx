import React from 'react';
import Strawberry_cream_cake from '../../assets/images/Strawberry_cream_cake.png';
import AboutBannerImage from '../../assets/images/about-banner.png';
import { Link } from 'react-router-dom';
import recipeData from '../../data/recipeData';

const RecipeScreen = () => {
  return (
    <>
      <section 
        className="relative w-full h-96 bg-cover bg-center" 
        style={{ backgroundImage: `url(${AboutBannerImage})` }}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold hover:text-greenColor">Recipe</h1>
          <p className="mt-2">
            <span className=" font-bold hover:text-greenColor"><Link to='/'>Home</Link></span> / <span className=" font-bold hover:text-greenColor">Recipe</span>
          </p>
        </div>
      </section>

      <div className="bg-gray-100 py-10">
        <div className="mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Generated Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipeData.map((recipe, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 transition duration-500 ease-in-out hover:opacity-50"></div>
                <div className="relative">
                  <img src={Strawberry_cream_cake} alt={recipe.question} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">{recipe.question}</h3>
                    <p className="text-gray-300 mt-2">{recipe.answer.substring(0, 100)}...</p>
                    <Link to={`/recipe/${index}`} className="inline-block mt-4 text-green-500 font-semibold hover:text-green-700">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className=" mx-auto w-full">
          <div className=" mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold">Strawberry Cream Cheesecake</h1>
              <p className="text-gray-700 mt-2">by <span className="font-bold">User Name</span> | <span className="font-bold">Date</span> | <span className="font-bold">5 stars</span></p>
            </div>
            <div className="flex justify-center mb-6">
              <img src={Strawberry_cream_cake} alt="Strawberry Cream Cheesecake" className="rounded-lg shadow-lg w-full" />
            </div>
            <div className="mb-6 text-gray-700">
              <p>One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!</p>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="list-disc list-inside">
                <li>150g unsalted butter, melted</li>
                <li>For the cheesecake:</li>
                <ul className="list-disc list-inside ml-4">
                  <li>500g digestive biscuits, crushed</li>
                  <li>600g Philadelphia cream cheese, softened</li>
                  <li>100g caster sugar</li>
                  <li>300ml double/heavy cream, whipped</li>
                  <li>1 tsp vanilla extract</li>
                  <li>200g fresh strawberries</li>
                  <li>2 tbsp water</li>
                </ul>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="list-decimal list-inside">
                <li>Pour mixture into a 20cm (8") tin. Use the back of a spoon to firmly press the mixture across the bottom and sides of the tin. Chill for 30 minutes.</li>
                <li>Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.</li>
                <li>Next, add the graham cracker crumbs to the bowl and mix to combine. Press the mixture into the bottom of a 9-inch springform pan. Chill in the refrigerator for 30 minutes.</li>
                <li>Add the cream cheese to a mixing bowl and use a hand mixer to beat until smooth. Then, add the whipped cream, vanilla extract, and powdered sugar to the bowl and mix until smooth.</li>
                <li>To add the strawberries to the gelatin mixture and use a hand mixer to beat until the gelatin mixture is smooth and the strawberries are evenly distributed.</li>
                <li>Pour the cream cheese mixture over the chilled crust and spread it out evenly. Refrigerate for at least 4 hours or until the cheesecake is set.</li>
              </ol>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Nutrition Facts</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 p-2">Nutrient</th>
                    <th className="border-b-2 p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b p-2">Calories</td>
                    <td className="border-b p-2">370.9</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Total Fat</td>
                    <td className="border-b p-2">10.7g</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Saturated Fat</td>
                    <td className="border-b p-2">6.5g</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Cholesterol</td>
                    <td className="border-b p-2">27mg</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Carbohydrates</td>
                    <td className="border-b p-2">37.2g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export  default RecipeScreen;
