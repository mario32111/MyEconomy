// src/features/IA/ChatIA/hooks/useAIChat.js
import { useState, useEffect } from 'react';
import { sendMessageToAI, generateThinkingProcess, getUserFinancialContext } from '../services/aiService';

const useAIChat = (userId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinking, setThinking] = useState('');
  const [userContext, setUserContext] = useState({});
  
  // Cargar mensajes anteriores del almacenamiento local
  useEffect(() => {
    if (!userId) return;
    
    const loadMessages = async () => {
      try {
        // Cargar mensajes del localStorage
        const savedMessages = localStorage.getItem(`chat_messages_${userId}`);
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
        
        // Cargar contexto del usuario
        const context = await getUserFinancialContext(userId);
        setUserContext(context);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    };
    
    loadMessages();
  }, [userId]);
  
  // Guardar mensajes en el almacenamiento local cuando cambian
  useEffect(() => {
    if (!userId || messages.length === 0) return;
    localStorage.setItem(`chat_messages_${userId}`, JSON.stringify(messages));
  }, [messages, userId]);
  
  const sendMessage = async (content) => {
    if (!content.trim()) return;
    
    // Agregar mensaje del usuario
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Generar y mostrar el proceso de razonamiento
      const thinkingProcess = generateThinkingProcess(content, userContext);
      setThinking(thinkingProcess);
      
      // Esperar un momento para que se muestre el proceso de razonamiento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enviar mensaje a la IA (ahora simulada localmente)
      const messagesForAI = [...messages, userMessage].map(({ role, content }) => ({ role, content }));
      const aiResponse = await sendMessageToAI(messagesForAI, userId);
      
      // Agregar respuesta de la IA
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde." 
      }]);
    } finally {
      setIsLoading(false);
      setThinking('');
    }
  };
  
  const clearChat = () => {
    setMessages([]);
    if (userId) {
      localStorage.removeItem(`chat_messages_${userId}`);
    }
  };
  
  return {
    messages,
    isLoading,
    thinking,
    sendMessage,
    clearChat
  };
};

export default useAIChat;