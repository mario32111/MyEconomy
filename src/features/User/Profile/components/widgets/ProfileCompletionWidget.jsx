// src/features/Dashboard/components/widgets/ProfileCompletionWidget.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  LinearProgress,
  Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../shared/contexts/AuthContext';
import profileService from '../../../../shared/services/profileService';

const ProfileCompletionWidget = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!user?.id) return;
      
      try {
        const response = await profileService.getProfile(user.id);
        if (response.success && response.data.profile) {
          const profile = response.data.profile;
          
          // Calcular porcentaje de completitud
          const fields = [
            'monthly_income', 
            'current_savings', 
            'monthly_expenses', 
            'primary_goal',
            'timeframe',
            'savings_goal',
            'risk_tolerance',
            'budget_type',
            'notification_preference'
          ];
          
          let completedFields = 0;
          fields.forEach(field => {
            if (profile[field] !== null && profile[field] !== '') {
              completedFields++;
            }
          });
          
          const percentage = Math.round((completedFields / fields.length) * 100);
          setCompletionPercentage(percentage);
          setIsComplete(percentage === 100);
        }
      } catch (err) {
        console.error('Error al verificar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    checkProfileCompletion();
  }, [user]);

  const handleCompleteProfile = () => {
    navigate('/profile/financial');
  };

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={10} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton variant="rectangular" width={120} height={36} />
        </Box>
      </Paper>
    );
  }

  // Si el perfil está completo, no mostrar el widget
  if (isComplete) {
    return null;
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
      <Typography variant="h6" gutterBottom>
        Completa tu perfil financiero
      </Typography>
      
      <Typography variant="body2" paragraph>
        Personaliza tu experiencia completando tu perfil financiero. Esto nos ayudará a ofrecerte recomendaciones más precisas.
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">Progreso</Typography>
          <Typography variant="body2">{completionPercentage}%</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={completionPercentage} 
          sx={{ 
            height: 8, 
            borderRadius: 1,
            bgcolor: 'rgba(255,255,255,0.3)',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'white'
            }
          }} 
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="secondary"
          onClick={handleCompleteProfile}
          sx={{ 
            color: 'primary.main',
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)'
            }
          }}
        >
          Completar perfil
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileCompletionWidget;