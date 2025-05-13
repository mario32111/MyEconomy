// src/features/Education/components/Progress/GrowthTree.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

// Importar imágenes (asegúrate de que estas rutas sean correctas)
import image1 from '../../../../assets/img/trees/arbol1.jpg';
import image2 from '../../../../assets/img/trees/arbol2.jpg';
import image3 from '../../../../assets/img/trees/arbol3.jpg';
import image4 from '../../../../assets/img/trees/arbol4.jpg';
import image5 from '../../../../assets/img/trees/arbol5.jpg';

// Array de imágenes
const treeImages = {
  oak: [image1, image2, image3, image4, image5],
  pine: [image1, image2, image3, image4, image5], // Usa las mismas imágenes como fallback
  maple: [image1, image2, image3, image4, image5], // Usa las mismas imágenes como fallback
  cherry: [image1, image2, image3, image4, image5] // Usa las mismas imágenes como fallback
};

// Componente simplificado que recibe props directamente
const GrowthTree = ({ treeType = 'oak', progress = 0, animate = false }) => {
  // Precarga de imágenes para evitar CLS
  useEffect(() => {
    const preloadImages = () => {
      const imageSet = treeImages[treeType] || treeImages.oak;
      imageSet.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, [treeType]);
  
  // Determinar qué imagen mostrar basado en el progreso
  const currentImageIndex = useMemo(() => {
    if (progress >= 100) return 4;
    if (progress >= 75) return 3;
    if (progress >= 50) return 2;
    if (progress >= 25) return 1;
    return 0;
  }, [progress]);
  
  // Obtener la imagen actual
  const currentImage = useMemo(() => {
    const imageSet = treeImages[treeType] || treeImages.oak;
    return imageSet[currentImageIndex];
  }, [treeType, currentImageIndex]);
  
  // Obtener la siguiente imagen (para animación)
  const nextImage = useMemo(() => {
    if (currentImageIndex >= 4) return null;
    const imageSet = treeImages[treeType] || treeImages.oak;
    return imageSet[currentImageIndex + 1];
  }, [treeType, currentImageIndex]);
  
  // Calcular el progreso hacia la siguiente etapa
  const progressToNextStage = useMemo(() => {
    const thresholds = [0, 25, 50, 75, 100];
    const currentThreshold = thresholds[currentImageIndex];
    const nextThreshold = thresholds[currentImageIndex + 1] || 100;
    
    if (progress >= 100) return 100;
    
    const range = nextThreshold - currentThreshold;
    const progressInRange = progress - currentThreshold;
    return (progressInRange / range) * 100;
  }, [progress, currentImageIndex]);

  return (
    <Tooltip 
      title={`Progreso: ${progress}%`}
      arrow
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}>
        {/* Contenedor de árbol con dimensiones fijas */}
        <Box sx={{ 
          position: 'relative',
          height: 200,
          width: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          margin: '0 auto'
        }}>
          {/* Imagen de etapa actual */}
          <Box 
            component="img"
            src={currentImage}
            alt={`Árbol - ${progress}%`}
            sx={{ 
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              position: 'absolute',
              bottom: 0,
              zIndex: 1
            }}
          />
          
          {/* Imagen de siguiente etapa (para animación) */}
          {animate && nextImage && (
            <Box 
              component="img"
              src={nextImage}
              alt="Próxima etapa"
              sx={{ 
                height: '100%',
                width: '100%',
                objectFit: 'contain',
                position: 'absolute',
                bottom: 0,
                opacity: progressToNextStage / 100,
                zIndex: 2
              }}
            />
          )}
          
          {/* Indicador de progreso */}
          <Box sx={{ 
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: 6,
            bgcolor: 'rgba(224, 224, 224, 0.7)',
            borderRadius: 3,
            overflow: 'hidden',
            zIndex: 3
          }}>
            <Box sx={{ 
              width: `${progress}%`,
              height: '100%',
              bgcolor: progress >= 100 ? 'success.main' : 'primary.main',
              transition: 'width 0.5s ease-in-out'
            }} />
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          align="center"
          sx={{ 
            mt: 1,
            fontWeight: progress >= 100 ? 'bold' : 'normal',
            color: progress >= 100 ? 'success.main' : 'text.primary'
          }}
        >
          {progress}% Completado
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default GrowthTree;