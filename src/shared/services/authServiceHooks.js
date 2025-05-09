// src/shared/services/authServiceHooks.js
import axios from 'axios';

// Define constants directly in this file
const API_URL = 'http://localhost:5000/api';

// Function to register user directly with the API
export const useSignup = () => {
  const signup = async (email, password, userData) => {
    try {
      console.log('Sending registration data:', userData);
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      // Determine email provider for redirect
      const emailParts = email.split('@');
      const emailProvider = emailParts.length > 1 ? emailParts[1] : '';
      
      return {
        success: true,
        data: {
          ...response.data,
          emailProvider
        }
      };
    } catch (error) {
      console.error('Error in registration:', error);
      return { 
        error: { 
          message: error.response?.data?.message || 'Error registering user' 
        } 
      };
    }
  };
  
  return { signup };
};

// Function to login
export const useLogin = (setUser) => {
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, data: userData };
    } catch (error) {
      return { 
        error: { 
          message: error.response?.data?.message || 'Error logging in' 
        } 
      };
    }
  };
  
  return { login };
};

// Function to logout
export const useLogout = (setUser) => {
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return { logout };
};