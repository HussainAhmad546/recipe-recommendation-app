import React, { useState } from 'react';
import dummy_avatar from '../../assets/images/dummy_avatar.webp';
// import recipeData from '../../data/recipeData';
import {MyContext} from '../../MyContext'
import { useContext } from 'react';


const ProfileScreen = () => {
  const { text, setText } = useContext(MyContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Profile</h1>
          <div className="flex items-center mb-6 justify-center">
            <img src={dummy_avatar} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
            <div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded mr-2">Upload photo</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
              <input className="w-full px-3 py-2 border rounded-lg" type="text" id="fullName" value="Susan M" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
              <input className="w-full px-3 py-2 border rounded-lg" type="text" id="username" value="susan_m" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input className="w-full px-3 py-2 border rounded-lg" type="email" id="email" value="susan@gmail.com" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input className="w-full px-3 py-2 border rounded-lg" type="password" id="password" value="********" />
            </div>
          </div>
          <div className="flex justify-end mx-4">
            <div className="mb-6 text-right mr-4">
              <button className="text-white bg-red-500 rounded bold p-2">Delete Account</button>
            </div>
            <div className="text-right">
              <button className="bg-orange-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>

<h1>{text}</h1>
      <button onClick={() => setText('Hello, world!')}>
        Click me
      </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
