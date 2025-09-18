// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import Button from '../common/Button';

// export default function Register() {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         role: 'admin'
//     });
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const { register } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     // frontend/src/components/auth/Register.jsx
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         if (formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match');
//             setLoading(false);
//             return;
//         }

//         try {
//             const result = await register({
//                 username: formData.username,
//                 email: formData.email,
//                 password: formData.password,
//                 role: formData.role
//             });
//             navigate('/dashboard');
//         } catch (err) {
//             console.error('Registration failed:', err);
//             setError(err.response?.data?.message || 'Registration failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8">
//                 <div>
//                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                         Create your account
//                     </h2>
//                 </div>
//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                     {error && (
//                         <div className="bg-red-50 border-l-4 border-red-500 p-4">
//                             <div className="flex">
//                                 <div className="ml-3">
//                                     <p className="text-sm text-red-700">{error}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     <div className="space-y-4">
//                         <div>
//                             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                                 Username
//                             </label>
//                             <input id="username" name="username" type="text" required value={formData.username} onChange={handleChange} className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
//                         </div>

//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email address
//                             </label>
//                             <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
//                         </div>

//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <input id="password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
//                         </div>

//                         <div>
//                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                                 Confirm Password
//                             </label>
//                             <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required value={formData.confirmPassword} onChange={handleChange} className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
//                         </div>
//                     </div>

//                     <div>
//                         <Button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
//                             {loading ? 'Creating account...' : 'Create account'}
//                         </Button>
//                     </div>

//                     <div className="text-center">
//                         <p className="text-sm text-gray-600">
//                             Already have an account?{' '}
//                             <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                                 Sign in
//                             </Link>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../common/Button";
import { motion } from "framer-motion";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const result = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            navigate('/dashboard');
        } catch (err) {
            console.error('Registration failed:', err);
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left Illustration / Branding Section */}
            <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center px-10"
                >
                    <h1 className="text-4xl font-extrabold mb-4">
                        Digital Restaurant Menus
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Create stunning digital menus with <b>AR-powered</b> dish previews.
                        Transform your restaurant experience today.
                    </p>
                </motion.div>
            </div>

            {/* Right Form Section */}
            <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-8 md:py-0 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
                >
                    <h2 className="text-3xl font-bold text-center text-black mb-6">
                        Create Your Account
                    </h2>

                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-4 rounded">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Confirm your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-900 transition-all duration-300 font-semibold text-sm"
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-gray-600 text-sm mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-black hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
