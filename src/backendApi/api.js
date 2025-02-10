import axios from "axios";

const API_URL = "https://learn-hub-backend-u8g4.vercel.app";

export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/courses`);
        return response.data.courses;
    } catch (error) {
        console.log("Error fetching..");
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/user/signup`, userData);
        return response.data;
    } catch (error) {
        console.error("Signup Failed");
        throw error;
    }
}

export const adminSignUp = async (adminData) => {
    try {
        const response = await axios.post(`${API_URL}/admin/signup`, adminData);
        return response.data;
    } catch (error) {
        console.error("Admin Signup Failed!!");
        throw error;
    }
}

export const adminSignIn = async (credential) => {
    try {
        const response = await axios.post(`${API_URL}/admin/signin`, credential);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("AdminName", response.data.name);
        localStorage.setItem("admin", response.data.admin);
        return response.data;
    } catch (error) {
        console.log("Admin not registered!!");
        throw error;
    }
}

export const createCourse = async (courseData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API_URL}/admin/courses`, courseData, 
            {headers: {Authorization: `Bearer ${token}`}},
        );
        return response.data;        
    } catch (error) {
        console.log("Course creation failed!!");
        throw error;
    }
}

export const signin = async (Credentials) => {
    try {
        const response = await axios.post(`${API_URL}/user/signin`, Credentials);
        localStorage.setItem("userToken", response.data.token);
        console.log(localStorage);
        return response.data;
    } catch (error) {
        console.log("Error signIn");
        throw error;
    }
}

export const purchaseCourse = async (courseId) => {
    const token = localStorage.getItem("userToken");
    try {
        const response = await axios.post(`${API_URL}/user/courses/${courseId}`,
            {},
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return response.data;
    } catch (error) {
        console.error ("Course purchase failed:");
        throw error;
    }
}

export const getCoursebyId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/user/course/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching");
        throw error;
    }
}