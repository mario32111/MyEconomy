import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Function to register user directly with the API
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

  // Function to login
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

  // Function to logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { 
    user, 
    loading,
    signup,
    login,
    logout
  };
};

export default useAuth;