import React from 'react';
import { Parallax } from 'react-parallax';
import { Box, Typography } from '@mui/material';

const ParallaxSection = ({ 
  bgImage, 
  height = 500, 
  strength = 300, 
  title, 
  children 
}) => {
  return (
    <Parallax bgImage={bgImage} strength={strength}>
      <Box 
        sx={{ 
          height, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        {title && (
          <Typography variant="h1" sx={{ color: 'white', textAlign: 'center' }}>
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Parallax>
  );
};

export default ParallaxSection;