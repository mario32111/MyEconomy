// src/features/Finance/components/ExpenseTracker/CategorySettings.jsx
import React, { useState } from 'react';
import { Card } from '../../../../shared/components/UI/Card';
import { Button } from '../../../../shared/components/UI/Button';
import { useExpenseTrackerLogic } from './ExpenseTrackerLogic';

const CategorySettings = () => {
  const { categories, saveUserCategoryPreference } = useExpenseTrackerLogic();
  const [selectedColors, setSelectedColors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Initialize selected colors from categories
  React.useEffect(() => {
    const initialColors = {};
    categories.forEach(category => {
      initialColors[category.id] = category.color;
    });
    setSelectedColors(initialColors);
  }, [categories]);

  const handleColorChange = (categoryId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [categoryId]: color
    }));
  };

  const handleSave = async (categoryId) => {
    setIsSaving(true);
    try {
      const result = await saveUserCategoryPreference(
        categoryId, 
        selectedColors[categoryId]
      );
      
      if (result.success) {
        setMessage({ 
          text: 'Color guardado correctamente', 
          type: 'success' 
        });
      } else {
        throw new Error('No se pudo guardar el color');
      }
    } catch (error) {
      console.error('Error saving color:', error);
      setMessage({ 
        text: 'Error al guardar el color', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Configuración de Categorías</h2>
      
      {message.text && (
        <div className={`mb-4 p-2 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
              <i className={`fas fa-${category.icon} mr-2`}></i>
              <span>{category.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={selectedColors[category.id] || '#000000'}
                onChange={(e) => handleColorChange(category.id, e.target.value)}
                className="w-8 h-8 rounded cursor-pointer"
              />
              
              <Button
                onClick={() => handleSave(category.id)}
                className="bg-blue-500 text-white text-sm px-2 py-1"
                disabled={isSaving}
              >
                {isSaving ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategorySettings;