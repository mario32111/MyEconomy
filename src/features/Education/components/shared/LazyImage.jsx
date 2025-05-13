// src/features/Education/components/UI/LazyImage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

const LazyImage = ({ src, alt, width = '100%', height = 'auto', aspectRatio = '16/9', ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <Box 
      sx={{ 
        width, 
        position: 'relative',
        aspectRatio,
        overflow: 'hidden',
        ...props.sx
      }}
    >
      {!loaded && !error && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave" 
        />
      )}
      
      {loaded && !error && (
        <img 
          src={src} 
          alt={alt} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: loaded ? 'block' : 'none',
          }}
        />
      )}
      
      {error && (
        <Box 
          sx={{ 
            width: '100%', 
            height: '100%', 
            bgcolor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}
        >
          Imagen no disponible
        </Box>
      )}
    </Box>
  );
};

export default LazyImage;