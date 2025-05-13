import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Button, Divider,
  Card, CardMedia
} from '@mui/material';
import InteractiveExample from './InteractiveExample';
import QuizQuestion from './QuizQuestion';
import MiniChallenge from './MiniChallenge';

const LessonContent = ({ lesson, courseId, lessonId, onComplete }) => {
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  
  // Verificar si la lección ya está completada
  useEffect(() => {
    const checkCompletion = () => {
      try {
        const completedLessons = JSON.parse(
          localStorage.getItem(`course_${courseId}_completed_lessons`) || '[]'
        );
        return completedLessons.includes(lessonId);
      } catch (error) {
        console.error('Error checking lesson completion:', error);
        return false;
      }
    };
    
    setCompleted(checkCompletion());
  }, [courseId, lessonId]);
  
  const handleComplete = () => {
    setCompleted(true);
    if (onComplete && typeof onComplete === 'function') {
      onComplete();
    }
  };
  
  const handleQuizComplete = () => {
    setQuizCompleted(true);
    if (!completed) {
      handleComplete();
    }
  };
  
  const handleChallengeComplete = () => {
    setChallengeCompleted(true);
    if (!completed && !lesson.quiz) {
      handleComplete();
    }
  };
  
  return (
    <Box>
      {/* Contenido principal */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          {lesson.content}
        </Typography>
        
        {lesson.type === 'video' && lesson.videoUrl && (
          <Box sx={{ my: 3, position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              src={lesson.videoUrl}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        )}
        
        {lesson.image && (
          <Card sx={{ my: 3 }}>
            <CardMedia
              component="img"
              height="300"
              image={lesson.image}
              alt={lesson.title}
              loading="lazy"
            />
          </Card>
        )}
        
        {!completed && !lesson.quiz && !lesson.interactive && !lesson.challenge && (
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleComplete}
            >
              Marcar como completado
            </Button>
          </Box>
        )}
      </Paper>
      
      {/* Ejemplo interactivo */}
      {lesson.interactive && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Actividad interactiva
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <InteractiveExample 
            data={lesson.interactive} 
            lessonId={lessonId}
            onComplete={handleComplete}
          />
        </Paper>
      )}
      
      {/* Mini desafío */}
      {lesson.challenge && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Mini desafío
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <MiniChallenge 
            data={lesson.challenge} 
            completed={challengeCompleted}
            onComplete={handleChallengeComplete}
          />
        </Box>
      )}
      
      {/* Quiz */}
      {lesson.quiz && (
        <Paper sx={{ p: 3, mb: 3 }}>
          {!showQuiz ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" gutterBottom>
                ¿Listo para poner a prueba tus conocimientos?
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => setShowQuiz(true)}
                sx={{ mt: 2 }}
              >
                Comenzar quiz
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Quiz: {lesson.title}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <QuizQuestion 
                questions={lesson.quiz.questions} 
                completed={quizCompleted}
                onComplete={handleQuizComplete}
              />
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default LessonContent;