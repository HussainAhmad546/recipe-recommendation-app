import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/userScreen/HomeScreen";
import About from "./screens/userScreen/AboutScreen";
import Contact from "./screens/userScreen/ContactScreen";
import Recipe from "./screens/userScreen/RecipeScreen";
import RecipeMaker from "./screens/userScreen/RecipeMake";
import Dashboard from "./screens/adminScreen/index";
import Profile from "./screens/userScreen/ProfileScreen";
import RecipeDetail from "./screens/userScreen/RecipeDetail";
import LoginModal from "./modal/LoginModal";
import { MyContext } from "./MyContext";
import Checkout from "./screens/userScreen/CheckoutScreen";
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './components/Stripe';
import RecipeList from "./screens/userScreen/RecipeList";

const App = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isAdmin) {
      setIsAdmin(true);
    }
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const showHeaderAndFooter = location.pathname !== "/admin";

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <Routes>
        <Route
          path="/"
          element={<Home setLoginModalOpen={setLoginModalOpen} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/login" element={<LoginModal  />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/recipe-maker" element={<RecipeMaker />} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/recipeList" element={<RecipeList/>}/>
        <Route
          path="/admin"
          element={
            isAdmin && isLoggedIn ? (
              <Dashboard />
            ) : (
              <Home
                isLoginModalOpen={true}
                setLoginModalOpen={setLoginModalOpen}
              />
            )
          }
        />
      </Routes>
      {showHeaderAndFooter && <Footer />}
    </>
  );
};

const AppWrapper = () => {
  const [text, setText] = useState("");
  return (
    <MyContext.Provider value={{ text, setText }}>
    <Router>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
    </Router>
    </MyContext.Provider>
  );
};

export default AppWrapper;
