// src/features/Education/utils/initEducationData.js
const initEducationData = () => {
    console.log('Initializing education data...');
    
    try {
      // Inicializar progreso general si no existe
      if (!localStorage.getItem('overall_progress')) {
        localStorage.setItem('overall_progress', '0');
      }
      
      // Inicializar árbol seleccionado si no existe
      if (!localStorage.getItem('selected_tree')) {
        localStorage.setItem('selected_tree', 'oak');
      }
      
      // Inicializar estructura de progreso si no existe
      if (!localStorage.getItem('course_progress')) {
        localStorage.setItem('course_progress', '{}');
      }
      
      console.log('Education data initialized successfully');
    } catch (error) {
      console.error('Error initializing education data:', error);
    }
  };
  
  export default initEducationData;