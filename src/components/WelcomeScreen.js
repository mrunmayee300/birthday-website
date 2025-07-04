import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const WelcomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const MissionTitle = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 3.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #4a90e2, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(74, 144, 226, 0.5);
`;

const Subtitle = styled(motion.h2)`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const MissionCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #4a90e2;
  border-radius: 15px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.3);
  backdrop-filter: blur(10px);
`;

const MissionText = styled(motion.p)`
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AgentName = styled.span`
  color: #4a90e2;
  font-weight: bold;
  text-shadow: 0 0 10px #4a90e2;
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(45deg, #4a90e2, #00d4ff);
  border: none;
  border-radius: 50px;
  padding: 1rem 3rem;
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(74, 144, 226, 0.6);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const TypingText = styled(motion.div)`
  font-family: 'Roboto', monospace;
  font-size: 1rem;
  color: #00d4ff;
  margin-top: 2rem;
  text-align: center;
  min-height: 1.5rem;
`;

const WelcomeScreen = ({ onComplete, missionData }) => {
  const [showButton, setShowButton] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentChar, setCurrentChar] = useState(0);
  
  const fullText = "Agent " + missionData.agentName + ", your mission awaits. Are you ready to begin?";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentChar < fullText.length) {
        setTypingText(fullText.slice(0, currentChar + 1));
        setCurrentChar(currentChar + 1);
      } else {
        setShowButton(true);
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [currentChar, fullText]);

  const handleStart = () => {
    onComplete();
  };

  return (
    <WelcomeContainer>
      <MissionTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        MISSION: BIRTHDAY SURPRISE
      </MissionTitle>
      
      <Subtitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        CLASSIFIED OPERATION
      </Subtitle>
      
      <MissionCard
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <MissionText>
          Welcome, <AgentName>{missionData.agentName}</AgentName>! 
          You have been selected for a top-secret mission of utmost importance.
        </MissionText>
        
        <MissionText>
          Your objective: Navigate through a series of interactive challenges 
          to unlock a special birthday surprise. Each level will test your skills 
          and reveal a piece of your mission.
        </MissionText>
        
        <MissionText>
          Mission Status: <span style={{ color: '#00d4ff' }}>READY</span>
          <br />
          Security Clearance: <span style={{ color: '#00d4ff' }}>GRANTED</span>
        </MissionText>
      </MissionCard>
      
      <TypingText>
        {typingText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      </TypingText>
      
      {showButton && (
        <StartButton
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BEGIN MISSION
        </StartButton>
      )}
    </WelcomeContainer>
  );
};

export default WelcomeScreen; 