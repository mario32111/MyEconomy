import { coursesData } from '../data/coursesData';

// Get all courses
export const getAllCourses = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return coursesData;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get course by ID
export const getCourseById = async (courseId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const course = coursesData.find(c => c.id === courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    return course;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

// Enroll in a course
export const enrollInCourse = async (courseId, userId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would create an enrollment record in the database
    // For now, we'll just store it in localStorage
    const enrollments = JSON.parse(
      localStorage.getItem(`user_${userId}_enrollments`) || '[]'
    );
    
    if (!enrollments.includes(courseId)) {
      enrollments.push(courseId);
      localStorage.setItem(`user_${userId}_enrollments`, JSON.stringify(enrollments));
      
      // Initialize course progress
      localStorage.setItem(`course_progress_${courseId}`, '0');
      
      // Store course data for progress calculations
      const course = coursesData.find(c => c.id === courseId);
      if (course) {
        localStorage.setItem(
          `course_${courseId}_data`,
          JSON.stringify({
            lessons: course.lessons,
            challenges: course.challenges || []
          })
        );
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

// Complete a lesson
export const completeLesson = async (courseId, lessonId, userId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would update a lesson completion record in the database
    // For now, we'll just store it in localStorage
    const completedLessons = JSON.parse(
      localStorage.getItem(`course_${courseId}_completed_lessons`) || '[]'
    );
    
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem(
        `course_${courseId}_completed_lessons`,
        JSON.stringify(completedLessons)
      );
      
      // Update course progress
      const course = coursesData.find(c => c.id === courseId);
      if (course) {
        const totalLessons = course.lessons.length;
        const progress = Math.round((completedLessons.length / totalLessons) * 100);
        localStorage.setItem(`course_progress_${courseId}`, progress.toString());
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error completing lesson:', error);
    throw error;
  }
};

// Complete a challenge
export const completeChallenge = async (courseId, challengeId, userId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would update a challenge completion record in the database
    // For now, we'll just store it in localStorage
    const completedChallenges = JSON.parse(
      localStorage.getItem(`course_${courseId}_completed_challenges`) || '[]'
    );
    
    if (!completedChallenges.includes(challengeId)) {
      completedChallenges.push(challengeId);
      localStorage.setItem(
        `course_${courseId}_completed_challenges`,
        JSON.stringify(completedChallenges)
      );
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error completing challenge:', error);
    throw error;
  }
};

// Get user achievements
export const getUserAchievements = async (userId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would fetch achievements from the database
    // For now, we'll just get them from localStorage
    const achievements = JSON.parse(
      localStorage.getItem('user_achievements') || '[]'
    );
    
    return achievements;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
};