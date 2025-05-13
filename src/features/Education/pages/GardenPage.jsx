// src/features/Education/pages/GardenPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Grid, Paper, 
  Card, CardContent, CardMedia, CardActionArea,
  Button, Divider, Tabs, Tab, Alert
} from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import GrowthTree from '../components/Progress/GrowthTree';
import useProgress from '../hooks/useProgress';
// Añade estas importaciones al inicio de GardenPage.jsx
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import Chip from '@mui/material/Chip';

const GardenPage = () => {
  const { getOverallProgress } = useProgress();
  const [selectedTree, setSelectedTree] = useState('oak');
  const [tabValue, setTabValue] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  
  // Árboles disponibles
  const availableTrees = [
    { id: 'oak', name: 'Roble', description: 'Un árbol fuerte y resistente, perfecto para principiantes.' },
    { id: 'pine', name: 'Pino', description: 'Crece rápido y se mantiene verde todo el año.' },
    { id: 'maple', name: 'Arce', description: 'Conocido por sus hermosas hojas que cambian de color.' },
    { id: 'palm', name: 'Palmera', description: 'Representa el éxito y la abundancia.' },
  ];
  
  // Árboles premium (bloqueados)
  const premiumTrees = [
    { id: 'cherry', name: 'Cerezo', description: 'Florece con hermosas flores rosadas en primavera.' },
    { id: 'willow', name: 'Sauce', description: 'Elegante y flexible, simboliza la adaptabilidad.' },
    { id: 'baobab', name: 'Baobab', description: 'Majestuoso y antiguo, representa la sabiduría.' },
    { id: 'sequoia', name: 'Secuoya', description: 'El más alto y longevo, simboliza el crecimiento constante.' },
  ];
  
  useEffect(() => {
    // Cargar progreso general
    const progress = getOverallProgress();
    setOverallProgress(progress);
    
    // Cargar árbol seleccionado
    const savedTree = localStorage.getItem('selected_tree') || 'oak';
    setSelectedTree(savedTree);
  }, [getOverallProgress]);
  
  const handleTreeSelect = (treeId) => {
    setSelectedTree(treeId);
    localStorage.setItem('selected_tree', treeId);
    setShowAlert(true);
    
    // Ocultar alerta después de 3 segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handlePremiumClick = () => {
    // Aquí iría la lógica para mostrar información sobre la versión premium
    alert('Esta función estará disponible próximamente en la versión premium.');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mi Jardín de Aprendizaje
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Personaliza tu experiencia de aprendizaje seleccionando un árbol que crecerá a medida que avanzas en tus cursos.
      </Typography>
      
      {showAlert && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          onClose={() => setShowAlert(false)}
        >
          ¡Árbol seleccionado con éxito! Tu progreso ahora se mostrará con este árbol.
        </Alert>
      )}
      
      <Grid container spacing={4}>
        {/* Árbol actual */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Mi Árbol Actual
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <GrowthTree 
                treeType={selectedTree} 
                progress={overallProgress} 
                animate={true}
              />
              
              <Box sx={{ width: '100%', mt: 3 }}>
                <Typography variant="body2" color="text.secondary" paragraph align="center">
                  Tu árbol ha crecido un {overallProgress}% basado en tu progreso general.
                </Typography>
                <Typography variant="body2" paragraph align="center">
                  <strong>{availableTrees.find(tree => tree.id === selectedTree)?.name || 'Árbol'}</strong>: {availableTrees.find(tree => tree.id === selectedTree)?.description}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Selección de árboles */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab icon={<ForestIcon />} label="Árboles Disponibles" />
                <Tab icon={<EmojiNatureIcon />} label="Árboles Premium" />
              </Tabs>
            </Box>
            
            {/* Árboles disponibles */}
            {tabValue === 0 && (
              <Grid container spacing={2}>
                {availableTrees.map(tree => (
                  <Grid item xs={12} sm={6} key={tree.id}>
                    <Card 
                      variant="outlined"
                      sx={{ 
                        border: selectedTree === tree.id ? '2px solid' : '1px solid',
                        borderColor: selectedTree === tree.id ? 'primary.main' : 'divider'
                      }}
                    >
                      <CardActionArea onClick={() => handleTreeSelect(tree.id)}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://source.unsplash.com/random/300x200?${tree.id}+tree&sig=${tree.id}`}
                          alt={tree.name}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {tree.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {tree.description}
                          </Typography>
                          
                          {selectedTree === tree.id && (
                            <Box sx={{ mt: 2 }}>
                              <Chip 
                                label="Seleccionado" 
                                color="primary" 
                                size="small"
                                icon={<CheckIcon />}
                              />
                            </Box>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            
            {/* Árboles premium */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Desbloquea estos árboles especiales en la versión premium de la aplicación.
                </Typography>
                
                <Grid container spacing={2}>
                  {premiumTrees.map(tree => (
                    <Grid item xs={12} sm={6} key={tree.id}>
                      <Card variant="outlined" sx={{ position: 'relative' }}>
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0, 
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                          }}
                        >
                          <LockIcon sx={{ color: 'white', fontSize: 40 }} />
                        </Box>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://source.unsplash.com/random/300x200?${tree.id}+tree&sig=${tree.id}`}
                          alt={tree.name}
                          sx={{ filter: 'grayscale(70%)' }}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {tree.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {tree.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={handlePremiumClick}
                    startIcon={<StarIcon />}
                  >
                    Desbloquear versión premium
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GardenPage;