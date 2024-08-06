import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginModal = ({
  isOpen,
  onClose,
  onSwitchToSignUp,
  onLoginSuccess,
  loginwithGenerteButoon,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      debugger;
      const response = await axios.post(
        "http://localhost:7000/api/users/login",
        data
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      {
        if (response.data.isAdmin) {
          navigate("/admin");
        } else if (loginwithGenerteButoon) {
          window.location.href = "/recipe-maker";
        } else {
          window.location.href = "/";
        }
      }

      

      toast.success("Login successful!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-40">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onClose}
          >
            <AiOutlineClose size={24} />
          </button>
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="email"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded-md"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <label
              htmlFor="password"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded-md"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <button
              type="submit"
              className="w-full bg-greenColor hover:bg-greenColor text-white py-2 rounded-md font-bold"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Do not have any account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={onSwitchToSignUp}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginModal;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { AiOutlineClose } from 'react-icons/ai';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginModal = ({ isOpen, onClose, onSwitchToSignUp, setUser }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   if (!isOpen) return null;

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post('http://localhost:7000/api/users/login', data);
//       const user = response.data.user;
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       toast.success('Login successful!', { onClose });
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         toast.error('Invalid email or password. Please try again.');
//       } else {
//         toast.error('An error occurred. Please try again later.');
//       }
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-40">
//         <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
//           <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
//             <AiOutlineClose size={24} />
//           </button>
//           <h2 className="text-2xl mb-4 text-center">Login</h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <label htmlFor="email" className="mb-2.5 block font-medium text-black dark:text-white">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full mb-3 p-2 border rounded-md"
//               {...register('email', { required: true })}
//             />
//             {errors.email && <p className="text-red-500">Email is required</p>}

//             <label htmlFor="password" className="mb-2.5 block font-medium text-black dark:text-white">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full mb-3 p-2 border rounded-md"
//               {...register('password', { required: true })}
//             />
//             {errors.password && <p className="text-red-500">Password is required</p>}

//             <button
//               type="submit"
//               className="w-full py-2 bg-greenColor text-white rounded-md hover:bg-gray-800 hover:border-gray-800"
//             >
//               Login
//             </button>
//           </form>
//           <p className="text-center mt-4">
//             Don't have an account? <button onClick={onSwitchToSignUp} className="text-greenColor font-bold">Sign Up</button>
//           </p>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default LoginModal;
