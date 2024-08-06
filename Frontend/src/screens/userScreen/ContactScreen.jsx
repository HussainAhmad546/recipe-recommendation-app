import React, { useState } from 'react';
import ContactBannerImage from '../../assets/images/contact-background.webp';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:7000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
        setIsPopupVisible(true);
        setTimeout(() => setIsPopupVisible(false), 2000);
      } else {
        alert('Failed to send message: ' + result.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section 
        className="relative w-full h-96 bg-cover bg-center" 
        style={{ backgroundImage: `url(${ContactBannerImage})` }}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold hover:text-greenColor">Contact Us</h1>
        </div>
      </section>
      <div className="min-h-screen bg-white mt-10">
        <div className="container mx-auto py-16 px-16">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-greenColor text-xl font-bold uppercase mb-4">Let's Connect</h2>
              <h1 className="text-4xl font-extrabold mb-6">
                We’re a friendly bunch <br />and would love to hear <br /> from you!
              </h1>
            </div>
            <div className="w-full md:w-1/2">
              <form onSubmit={handleSubmit}>
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full rounded-md border-greenColor border shadow-sm p-3 focus:ring-1 focus:ring-greenColor focus:outline-none" placeholder="Your First Name" required/>
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full rounded-md border-greenColor border shadow-sm p-3 focus:ring-1 focus:ring-greenColor focus:outline-none" placeholder="Your Last Name" required/>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-greenColor border shadow-sm p-3 focus:ring-1 focus:ring-greenColor focus:outline-none" placeholder="Your Email Address"  required />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="text" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-greenColor border shadow-sm p-3 focus:ring-1 focus:ring-greenColor focus:outline-none" placeholder="Your Phone Number"  required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Enter Your Message</label>
                  <textarea id="message" value={formData.message} onChange={handleChange} className="mt-1 block w-full rounded-md border-greenColor border shadow-sm p-3 focus:ring-1 focus:ring-greenColor focus:outline-none" cols={30} rows={5} placeholder="Write your message here...." required/>
                </div>
                <button 
                  type="submit" 
                  className="mt-4 w-full bg-greenColor text-white rounded-md p-3 text-lg font-bold hover:bg-green-700 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <span>Sending....</span> : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 scale-100">
            <AiOutlineCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-gray-600">Your form was submitted successfully.</p>
          </div>
        </div>
      )}
       	<div className="mt-8">
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13625.511671438705!2d74.31517825!3d31.52037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919050a3aaadb6f%3A0x19cf527f5f56c0f2!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1690482416143!5m2!1sen!2sus"
              width="100%"
              height="450"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              className="border-none"
              title="Google Maps Location"
            ></iframe>
          </div>
    </>
  );
};

export default ContactScreen;
