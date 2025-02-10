import React, { useState, useEffect } from 'react';
import { getCourses, purchaseCourse } from '../backendApi/api';
import "./Home.css";
import { Link } from "react-router-dom";
import { Star, Clock, Users, PlusCircle, Loader2 } from 'lucide-react';
import Navbar from './Navbar';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchCourses = async () => {
    try {
      const courseList = await getCourses();
      setCourses(courseList);
      setShowCourses(true);
    } catch (error) {
      console.error("error fecthing");
    }
  }

  const adminCheck = () => {
    if (localStorage.getItem("admin") === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false)
    }
  }

  // const handlePurchase = async (id) => {
  //     try {
  //         const response = await purchaseCourse(id);
  //         alert(response.message);
  //     } catch (error) {
  //         alert("Purchase failed");
  //     }
  // }

  useEffect(() => {
    fetchCourses();
    adminCheck();
  }, [])
  return (
    <body>
      <Navbar setIsAdmin={setIsAdmin} />
      {showCourses ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Study at our premium platform of education
            </h1>
            <p className="text-xl text-gray-600">
              Learn from industry experts and advance your career
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <img src={course.imageLink} alt={course.title} className="w-full h-48 courseImage" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-gray-700">{course.stars}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="ml-1 text-gray-700">{course.customers}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="ml-1 text-gray-700">{course.courseTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      &#8377;{course.price}
                    </span>
                    <Link
                      to={`/courses/${course._id}`}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-150"
                    >
                      Learn More
                    </Link>
                    {/* <button onClick={() => handlePurchase(course._id)}>LearnMore</button> */}
                  </div>
                </div>
              </div>
            ))}
            {isAdmin &&
              <Link
                to="/admin/courses"
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center h-full min-h-[384px]"
              >
                <PlusCircle className="h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Add New Course
                </h3>
                <p className="text-gray-600 text-center mt-2 px-4">
                  Create and publish a new course
                </p>
              </Link>
            }
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            <div className="absolute inset-0 w-16 h-16 border-8 border-gray-200 rounded-full" />
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Loading...
            </h1>
            <p className="text-gray-600">
              Please wait while we set things up for you
            </p>
          </div>

          <div className="mt-2 flex gap-2 items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <p>Connecting to server</p>
          </div>
        </div>
      )}
      {/* <div>
                <button onClick={fetchCourses}>Courses</button>
            </div> */}
      {/* <div className='buttonImp'>
                <Link to="/signin">
                <button>Signin</button>
                </Link>
                <Link to="/signup">
                <button>Signup</button>
                </Link>
            </div>
            {showCourses && (
                <div>
                    <p>Available courses</p>
                    <div>
                        {courses.map((course) => {
                            return(
                            <div key={course._id}>
                                <p>{course.title}</p>
                                <p>{course.description}</p>
                                <p>{course.imageLink}</p>
                                <p>{course.price}</p>
                                <button onClick={() => handlePurchase(course._id)}>Purchase</button>
                            </div>
                            )
                        })}
                    </div>
                </div>
            )} */}
    </body>
  )
}

export default Home