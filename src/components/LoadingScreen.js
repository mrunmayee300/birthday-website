import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
`;

const LoadingText = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px #4a90e2;
`;

const LoadingBar = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(74, 144, 226, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #00d4ff);
  border-radius: 2px;
`;

const LoadingMessage = styled(motion.p)`
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  color: #ffffff;
  margin-top: 2rem;
  text-align: center;
  opacity: 0.8;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #4a90e2;
  border-radius: 50%;
  box-shadow: 0 0 10px #4a90e2;
`;

const LoadingScreen = () => {
  const messages = [
    "Initializing mission protocols...",
    "Loading birthday surprise modules...",
    "Preparing interactive elements...",
    "Establishing secure connection...",
    "Mission ready for deployment!"
  ];

  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContainer>
      <LoadingText
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        MISSION CONTROL
      </LoadingText>
      
      <LoadingBar>
        <LoadingProgress
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </LoadingBar>
      
      <LoadingMessage
        key={currentMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {messages[currentMessage]}
      </LoadingMessage>

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <Particle
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </LoadingContainer>
  );
};

export default LoadingScreen; 