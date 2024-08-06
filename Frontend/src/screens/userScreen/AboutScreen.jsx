import React from 'react';
import AboutBannerImage from '../../assets/images/about-banner.jpg';
import aside_image from '../../assets/images/aside_image_1.jpeg'
import Testimonial from '../../components/Testimonial';
import PricingTable from '../../components/PricingTable';

const AboutScreen = () => {
  return (
    <>
    <div className="bg-cover bg-center" style={{backgroundImage: `url(${AboutBannerImage})`, width:'100%' , height:'600px'}}>
      <div className="bg-gray-100 lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 mt-24 ml-16">
        We're a group of foodies who love cooking and the internet
        </h1>
        <p className="text-lg text-gray-600 mb-8 ml-16">
        Food qualities thrive children uses best chanced shops. Hamish trends. Trends mentally diverse. Conic shots owner girls live oil shelves best trends fresh, made trends heaven home. 
        </p>  
      </div>
    </div>
    <div className="flex flex-col md:flex-row items-center my-10 container mx-auto px-4 lg:px-16">
        <div className="text-center md:text-left md:w-full py-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Simple, Easy Recipes for all</h2>
          <p className="text-lg text-gray-700">
            Alley talents interest internet leading, parties public interest's themes trends heaven. Om live oil shelves best fresh. Make heaven shelves. Children uses trends chanced shops, hamish tasty heavens from centerpiece.
          </p>
        </div>
        <div className="md:w-1/2 p-4 flex justify-center">
          <img src={aside_image} alt="Feature" className="rounded-lg shadow-lg object-cover h-[300px] w-full md:h-[350px]" />
        </div>
      </div>
      <PricingTable/>
      <Testimonial/>
    </>
  );
}

export default AboutScreen;
