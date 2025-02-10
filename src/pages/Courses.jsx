import React, { useState, useEffect } from "react";
import { Star, Clock, Users, CheckCircle } from 'lucide-react';
import { getCoursebyId, purchaseCourse } from "../backendApi/api";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Courses = () => {
    const [course, setCourse] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCoursebyId(id);
                setCourse(response.course);
                // console.log(response);
            } catch (error) {
                console.log("Error fetching course", error);
            }
        };

        fetchCourse();
    }, [id]);

    const handlePurchase = async (courseId) => {
        try {
            const response = await purchaseCourse(courseId);
            toast.success(response.message, {position: "top-center", autoClose: 1000});
            // course.customers++;
            const updateCustomers = await getCoursebyId(id);
            setCourse(updateCustomers.course);
        } catch (error) {
            if(localStorage.getItem("admin") === "true") {
                toast.warn("Register as User!!", {position: "top-center", autoClose: 1000});
            } else {
                toast.error("Purchase failed!!", {position: "top-center", autoClose: 1000});
            }
        }
    }

    return (
        <div className="course-details">
            {course ? (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <img
                                    src={course.imageLink}
                                    alt={course.title}
                                    className="w-full h-96 rounded-xl mb-8"
                                />
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-center">
                                        <Star className="h-5 w-5 text-yellow-400 cursor-pointer" />
                                        <span className="ml-1 text-gray-700">{course.stars}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 text-gray-400" />
                                        <span className="ml-1 text-gray-700">{course.customers} students</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                        <span className="ml-1 text-gray-700">{course.courseTime}</span>
                                    </div>
                                </div>
                                <div className="prose max-w-none mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                                    <p className="text-gray-700">{course.description}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                                    <div className="text-center mb-6">
                                        <span className="text-4xl font-bold text-gray-900">&#8377;{course.price}</span>
                                    </div>
                                    <button onClick={() => handlePurchase(course._id)} className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-150 mb-4 cursor-pointer">
                                        Purchase Course
                                    </button>
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold mb-2">This course includes:</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-gray-700">
                                                <Clock className="h-5 w-5 mr-2 text-gray-400" />
                                                {course.courseTime} of video content
                                            </li>
                                            <li className="flex items-center text-gray-700">
                                                <CheckCircle className="h-5 w-5 mr-2 text-gray-400" />
                                                Certificate of completion
                                            </li>
                                            <li className="flex items-center text-gray-700">
                                                <Users className="h-5 w-5 mr-2 text-gray-400" />
                                                Access to student community
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
            <ToastContainer/>
        </div>
    );
}

export default Courses;
