// src/features/Education/hooks/useCourses.js
import { useState, useEffect, useCallback } from 'react';
import coursesData from '../data/coursesData';

const useCourses = (initialFilters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load courses with filters
  const loadCourses = useCallback(async (filters = {}) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get courses from local data
      let filteredCourses = [...coursesData];
      
      // Apply filters
      if (filters.category && filters.category !== 'all') {
        filteredCourses = filteredCourses.filter(
          course => course.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      if (filters.level && filters.level !== 'all') {
        filteredCourses = filteredCourses.filter(
          course => course.level.toLowerCase() === filters.level.toLowerCase()
        );
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredCourses = filteredCourses.filter(
          course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Load progress from localStorage
      filteredCourses = filteredCourses.map(course => {
        const progress = localStorage.getItem(`course_progress_${course.id}`);
        return {
          ...course,
          progress: progress ? parseInt(progress, 10) : 0
        };
      });
      
      setCourses(filteredCourses);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Get a single course by ID
  const getCourseById = useCallback((courseId) => {
    try {
      // Find course in local data
      const course = coursesData.find(c => c.id === courseId);
      
      if (!course) {
        console.error('Course not found:', courseId);
        return null;
      }
      
      // Load progress from localStorage
      const progress = localStorage.getItem(`course_progress_${courseId}`);
      
      // Ensure course has lessons array
      const lessons = course.lessons || [];
      
      // Load completed lessons
      const completedLessons = JSON.parse(
        localStorage.getItem(`course_${courseId}_completed_lessons`) || '[]'
      );
      
      // Mark lessons as completed
      const lessonsWithProgress = lessons.map(lesson => ({
        ...lesson,
        completed: completedLessons.includes(lesson.id)
      }));
      
      return {
        ...course,
        lessons: lessonsWithProgress,
        progress: progress ? parseInt(progress, 10) : 0
      };
    } catch (error) {
      console.error('Error loading course:', error);
      return null;
    }
  }, []);
  
  // Get enrolled courses
  const getEnrolledCourses = useCallback(() => {
    try {
      // In a real app, you would filter courses the user is enrolled in
      // For now, we'll consider all courses with progress > 0 as enrolled
      const enrolledCourses = coursesData.map(course => {
        const progress = localStorage.getItem(`course_progress_${course.id}`);
        return {
          ...course,
          progress: progress ? parseInt(progress, 10) : 0
        };
      }).filter(course => course.progress > 0);
      
      // If no enrolled courses, return the first 3 as suggestions
      if (enrolledCourses.length === 0) {
        return coursesData.slice(0, 3).map(course => ({
          ...course,
          progress: 0
        }));
      }
      
      return enrolledCourses;
    } catch (error) {
      console.error('Error loading enrolled courses:', error);
      return [];
    }
  }, []);
  
  // Get user courses (for tree selection)
  const getUserCourses = useCallback(() => {
    try {
      // For now, return all courses
      return coursesData.map(course => ({
        id: course.id,
        title: course.title,
        category: course.category
      }));
    } catch (error) {
      console.error('Error getting user courses:', error);
      return [];
    }
  }, []);
  
  // Load courses on mount and when filters change
  useEffect(() => {
    loadCourses(initialFilters);
  }, [initialFilters, loadCourses]);
  
  return {
    courses,
    loading,
    loadCourses,
    getCourseById,
    getEnrolledCourses,
    getUserCourses
  };
};

export default useCourses;