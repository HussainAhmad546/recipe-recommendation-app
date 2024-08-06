import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) ;
  const userID = user._id

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
  
    setLoading(true);
    setError('');
  
    const { token, error: stripeError } = await stripe.createToken(elements.getElement(CardElement));
  
    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:7000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',authentication:'get token from backend '
        },
        body: JSON.stringify({
          tokenId: token.id,
          amount: 300,
          userId: userID,
        }),
      });
  
      const data = await response.json();
      if (response.status===200) {
      const user =JSON.parse(localStorage.getItem("user"))
      if(user && data){
      user.points=data.points
      localStorage.setItem("user",JSON.stringify(user))
      }
      navigate('/recipe-maker');


      } else {
        setError(data.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="checkout-container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <CardElement className="mb-4 p-2 border border-gray-300 rounded" />
        <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {loading ? 'Processing...' : 'Pay'}
        </button>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </form>
    </div>
  );
};

export default Checkout;
