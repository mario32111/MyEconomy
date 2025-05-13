// src/features/Education/hooks/useProgress.js
import { useState, useEffect } from 'react';

const useProgress = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Inicializar el progreso con valores por defecto
  useEffect(() => {
    try {
      // Verificar si ya hay datos de progreso
      const hasProgress = localStorage.getItem('overall_progress');
      
      // Si no hay datos, inicializar con valores por defecto
      if (!hasProgress) {
        localStorage.setItem('overall_progress', '0');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error initializing progress data:', error);
      setError('No se pudo inicializar los datos de progreso');
      setLoading(false);
    }
  }, []);
  
  // Obtener progreso de un curso específico
  const getProgress = (courseId) => {
    if (!courseId) return 0;
    
    try {
      const progress = localStorage.getItem(`course_progress_${courseId}`);
      return progress ? parseInt(progress, 10) : 0;
    } catch (error) {
      console.error(`Error getting progress for course ${courseId}:`, error);
      return 0;
    }
  };
  
  // Obtener progreso general
  const getOverallProgress = () => {
    try {
      const progress = localStorage.getItem('overall_progress');
      return progress ? parseInt(progress, 10) : 0;
    } catch (error) {
      console.error('Error getting overall progress:', error);
      return 0;
    }
  };
  
  // Actualizar progreso de un curso
  const updateProgress = (courseId, lessonId, completed = false) => {
    if (!courseId) return;
    
    try {
      // 1. Obtener progreso actual
      const currentProgress = getProgress(courseId);
      
      // 2. Calcular nuevo progreso (simulado)
      // En una implementación real, esto dependería de la estructura del curso
      const newProgress = completed ? 100 : Math.min(currentProgress + 10, 100);
      
      // 3. Guardar progreso del curso
      localStorage.setItem(`course_progress_${courseId}`, newProgress.toString());
      
      // 4. Actualizar progreso general (promedio de todos los cursos)
      // En una implementación real, esto dependería de todos los cursos disponibles
      localStorage.setItem('overall_progress', newProgress.toString());
      
      return newProgress;
    } catch (error) {
      console.error(`Error updating progress for course ${courseId}:`, error);
      return getProgress(courseId);
    }
  };
  
  // Marcar lección como completada
  const completeLesson = (courseId, lessonId) => {
    if (!courseId || !lessonId) return false;
    
    try {
      // Guardar lección completada
      localStorage.setItem(`lesson_${courseId}_${lessonId}`, 'completed');
      
      // Actualizar progreso del curso
      updateProgress(courseId, lessonId);
      
      return true;
    } catch (error) {
      console.error(`Error completing lesson ${lessonId} for course ${courseId}:`, error);
      return false;
    }
  };
  
  // Verificar si una lección está completada
  const isLessonCompleted = (courseId, lessonId) => {
    if (!courseId || !lessonId) return false;
    
    try {
      return localStorage.getItem(`lesson_${courseId}_${lessonId}`) === 'completed';
    } catch (error) {
      console.error(`Error checking if lesson ${lessonId} is completed:`, error);
      return false;
    }
  };
  
  return {
    loading,
    error,
    getProgress,
    getOverallProgress,
    updateProgress,
    completeLesson,
    isLessonCompleted
  };
};

export default useProgress;