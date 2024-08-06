import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import team_member_one from '../assets/images/team_member_one.png'
import team_member_two from '../assets/images/team_member_two.png'
import team_member_three from '../assets/images/team_member_three.png'
import team_member_four from '../assets/images/team_member_four.png'
import team_member_five from '../assets/images/team_member_five.png'

const testimonials = [
  {
    name: 'John Doe',
    role: 'Executive Chef',
    message: 'The recipes are easy to follow, and the results are always delicious!',
    image: team_member_one
  },
  {
    name: 'Jane Smith',
    role: 'Pastry Chef',
    message: 'I love the creativity behind each recipe. It inspires me to try new things in the kitchen.',
    image: team_member_two
  },
  {
    name: 'Emily Johnson',
    role: 'Home Cook',
    message: 'These recipes have made cooking at home so much more fun and rewarding!',
    image: team_member_three
  },
  {
    name: 'Michael Brown',
    role: 'Food Critic',
    message: 'As a food critic, I’m always on the lookout for new and exciting flavors, and this site delivers.',
    image: team_member_four
  },
  {
    name: 'Michael Brown',
    role: 'Food Critic',
    message: 'As a food critic, I’m always on the lookout for new and exciting flavors, and this site delivers.',
    image: team_member_five
  },
  {
    name: 'Michael Brown',
    role: 'Food Critic',
    message: 'As a food critic, I’m always on the lookout for new and exciting flavors, and this site delivers.',
    image: team_member_one
  }
];

const Testimonial = () => {
  return (
    <div className="bg-gray-100 py-16 border-b-2 border-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
        <div className="flex flex-wrap justify-center">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="max-w-sm w-full p-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 flex flex-col items-center">
                  <img
                    className="w-24 h-24 rounded-full mb-4"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <h3 className="text-lg font-bold">{testimonial.name}</h3>
                  <p className="text-green-600 mb-2">{testimonial.role}</p>
                  <FaQuoteLeft className="text-green-500 text-3xl mb-4" />
                  <p className="text-center text-gray-600">{testimonial.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
