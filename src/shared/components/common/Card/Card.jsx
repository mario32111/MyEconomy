import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
}));

const Card = ({
  title,
  subheader,
  children,
  actions,
  elevation = 1,
  ...props
}) => {
  return (
    <StyledCard elevation={elevation} {...props}>
      {(title || subheader) && (
        <CardHeader
          title={title}
          subheader={subheader}
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

export default Card;