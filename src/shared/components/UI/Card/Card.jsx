// src/shared/components/UI/Card/Card.jsx
import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardActions, CardMedia, styled } from '@mui/material';
import PropTypes from 'prop-types';

// Estilos personalizados para la tarjeta
const StyledCard = styled(MuiCard)(({ theme, elevation, interactive, rounded }) => ({
  borderRadius: rounded ? '16px' : '8px',
  boxShadow: elevation ? `0 ${elevation * 2}px ${elevation * 4}px rgba(0,0,0,0.1)` : '0 4px 20px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  ...(interactive && {
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    },
  }),
}));

export const Card = ({ 
  children, 
  title,
  subheader,
  headerAction,
  media,
  mediaHeight,
  actions,
  elevation = 2,
  interactive = false,
  rounded = false,
  onClick,
  ...props 
}) => {
  return (
    <StyledCard 
      elevation={elevation}
      interactive={interactive}
      rounded={rounded}
      onClick={interactive ? onClick : undefined}
      {...props}
    >
      {title && (
        <CardHeader
          title={title}
          subheader={subheader}
          action={headerAction}
        />
      )}
      
      {media && (
        <CardMedia
          component="img"
          height={mediaHeight || 200}
          image={media}
          alt={title || "Card media"}
        />
      )}
      
      <CardContent>
        {children}
      </CardContent>
      
      {actions && (
        <CardActions>
          {actions}
        </CardActions>
      )}
    </StyledCard>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  subheader: PropTypes.node,
  headerAction: PropTypes.node,
  media: PropTypes.string,
  mediaHeight: PropTypes.number,
  actions: PropTypes.node,
  elevation: PropTypes.number,
  interactive: PropTypes.bool,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;