// src/shared/components/UI/OptimizedImage.jsx
import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

const OptimizedImage = ({ 
  src, 
  alt, 
  width = '100%', 
  height = 'auto',
  objectFit = 'contain',
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <Box 
      sx={{ 
        position: 'relative',
        width,
        height,
        display: 'inline-block'
      }}
    >
      {!loaded && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave"
        />
      )}
      <img 
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: loaded ? 'block' : 'none'
        }}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </Box>
  );
};

export default OptimizedImage;