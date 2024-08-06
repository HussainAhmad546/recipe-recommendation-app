import React, { useState, useEffect, useRef } from 'react';
import '../index.css';
import LoginModal from '../modal/LoginModal';
import SignUpModal from '../modal/SignUpModal';
import { NavLink } from 'react-router-dom';
import HeaderLogo from '../assets/images/brand2.svg';
import { FaBars, FaTimes, FaCoins } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignUpModalOpen(false);
  };

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setSignUpModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout Successfully');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="bg-[#F5F5F5] py-3 h-18">
        <div className="container mx-auto flex items-center justify-between mt-4 px-4 md:px-0">
          <div className="flex items-center">
            <img src={HeaderLogo} alt="Logo" className="w-28" />
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <NavLink className="mx-4 text-lg font-bold" to="/">Home</NavLink>
            <NavLink className="mx-4 text-lg font-bold" to="/about">About</NavLink>
            <NavLink className="mx-4 text-lg font-bold" to="/recipe">Recipe</NavLink>
            <NavLink className="mx-4 text-lg font-bold" to="/contact">Contact</NavLink>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center text-gray-800">
                  <FaCoins className="text-yellow-500 mr-1" size={18} />
                  <span className="text-lg font-semibold">{user.points || 0}</span>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="border border-greenColor bg-greenColor text-white p-2 cursor-pointer rounded-md w-24 hover:bg-gray-800 hover:border-gray-800 font-bold"
                    onClick={toggleDropdown}
                  >
                    {user.name}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                      <NavLink className="block px-4 py-2 text-gray-800 hover:bg-gray-100" to="/profile">Profile</NavLink>
                      <NavLink className="block px-4 py-2 text-gray-800 hover:bg-gray-100" to="/recipe-maker">Generate Recipe</NavLink>
                      <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button className="border border-greenColor bg-greenColor text-white p-2 cursor-pointer px-4 rounded-md w-24 hover:bg-gray-800 hover:border-gray-800 font-bold" onClick={openLoginModal}>
                Login
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {user ? (
              <div className="relative">
                <button className="border border-greenColor bg-greenColor text-white p-2 cursor-pointer px-4 rounded-md w-24 hover:bg-gray-800 hover:border-gray-800 font-bold">
                  {user.name}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <NavLink className="block px-4 py-2 text-gray-800 hover:bg-gray-100" to="/profile">Profile</NavLink>
                  <NavLink className="block px-4 py-2 text-gray-800 hover:bg-gray-100" to="/recipe-maker">Generate Recipe</NavLink>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <button className="mr-4 border border-greenColor bg-greenColor text-white p-2 cursor-pointer px-4 rounded-md w-24 hover:bg-gray-800 hover:border-gray-800 font-bold" onClick={openLoginModal}>
                Login
              </button>
            )}
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center gap-4 mt-4">
            <NavLink className="text-lg font-bold" to="/" onClick={toggleMobileMenu}>Home</NavLink>
            <NavLink className="text-lg font-bold" to="/about" onClick={toggleMobileMenu}>About</NavLink>
            <NavLink className="text-lg font-bold" to="/recipe" onClick={toggleMobileMenu}>Recipe</NavLink>
            <NavLink className="text-lg font-bold" to="/contact" onClick={toggleMobileMenu}>Contact</NavLink>
          </div>
        )}
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} onSwitchToSignUp={openSignUpModal} setUser={setUser} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeModals} onSwitchToLogin={openLoginModal} />
      <ToastContainer />
    </>
  );
};

export default Header;

