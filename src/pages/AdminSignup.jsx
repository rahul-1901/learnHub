import React, { useState } from "react";
import { adminSignUp, signup } from "../backendApi/api";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { BookOpen } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await adminSignUp(formData);
            toast.success(response.message, { position: "top-center", autoClose: 1000 });
            setTimeout(() => navigate("/admin/signin"), 2000);
        } catch (error) {
            toast.error("Admin registration failed!!", { position: "top-center", autoClose: 1000 });
        }
    }

    return (
        <>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center">
                            <BookOpen className="h-12 w-12 text-indigo-600" />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your admin account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already registered as Admin?{' '}
                            <Link to="/admin/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </Link>
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            Register as User?{' '}
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter name"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Create a password"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>
                    </form>
                    <button
                        type="submit"
                        onClick={handleSignup}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                    >
                        Create account
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AdminSignup;