import React, { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const password = useWatch({ control, name: 'password', defaultValue: '' });

  useEffect(() => {
    if (!isOpen) {
      setValue('name', '');
      setValue('email', '');
      setValue('password', '');
      setValue('passwordConfirm', '');
    }
  }, [isOpen, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:7000/api/users/', data);
      toast.success('Account Created successfully');
      setTimeout(() => {
        onClose();
      }, 1500);
      setTimeout(onSwitchToLogin, 2000);
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-60">
          <button className="absolute top-2 right-2" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="mb-2.5 block font-medium text-black dark:text-white">
                Name
              </label>
              <div className="relative">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                    />
                  )}
                />
                {errors.name && (
                  <span className="absolute right-4 top-4 text-red-500">Name is required</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                  )}
                />
                {errors.email && (
                  <span className="absolute right-4 top-4 text-red-500">
                    {errors.email.message || 'Email is required'}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                    />
                  )}
                />
                {errors.password && (
                  <span className="absolute right-4 top-4 text-red-500">
                    {errors.password.message || 'Password is required'}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="passwordConfirm"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Re-type Password
              </label>
              <div className="relative">
                <Controller
                  name="passwordConfirm"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: (value) =>
                      value === password || 'Passwords do not match'
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      id="passwordConfirm"
                      placeholder="Re-enter your password"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.passwordConfirm ? 'border-red-500' : ''
                      }`}
                    />
                  )}
                />
                {errors.passwordConfirm && (
                  <span className="absolute right-4 top-4 text-red-500">
                    {errors.passwordConfirm.message || 'Passwords do not match'}
                  </span>
                )}
              </div>
            </div>

              <div className="mb-5">
         <input
                type="submit"
                value="Create account"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white bg-greenColor font-bold transition hover:bg-opacity-90"
              />
            </div>
          </form>

          <div className="mt-6 text-center">
            <p>
              Already have an account?{' '}
              <span className="text-primary cursor-pointer" onClick={onSwitchToLogin}>
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpModal;
