import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { adminSignIn, signin } from "../backendApi/api";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSignin = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        admin: true
    });

    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await adminSignIn(formData);
            localStorage.removeItem("userToken");
            toast.success("Admin Validated!!", {position: "top-center", autoClose: 1000});
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            toast.error("Invalid Credientials", {position: "top-center", autoClose: 1000});
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
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in as Admin</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or{' '}
                            <Link to="/admin/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                create a new account
                            </Link>
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            Or{' '}
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Register as User
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Admin Name
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your name.."
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your password.."
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>
                    </form>
                    <button
                        onClick={handleSignin}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                    >
                        Sign in
                    </button>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default AdminSignin;