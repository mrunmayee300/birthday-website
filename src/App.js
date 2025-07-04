import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import WelcomeScreen from './components/WelcomeScreen';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import Finale from './components/Finale';
import LoadingScreen from './components/LoadingScreen';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
`;

const BackgroundParticles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #4a90e2, transparent),
      radial-gradient(2px 2px at 40px 70px, #00d4ff, transparent),
      radial-gradient(1px 1px at 90px 40px, #4a90e2, transparent),
      radial-gradient(1px 1px at 130px 80px, #00d4ff, transparent),
      radial-gradient(2px 2px at 160px 30px, #4a90e2, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: float 20s linear infinite;
  }
`;



function App() {
  const [currentLevel, setCurrentLevel] = useState(0); // Start from welcome screen
  const [isLoading, setIsLoading] = useState(true);
  const [missionData, setMissionData] = useState({
    agentName: 'Mama',
    completedLevels: [],
    score: 0
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const advanceLevel = () => {
    setCurrentLevel(prev => prev + 1);
    setMissionData(prev => ({
      ...prev,
      completedLevels: [...prev.completedLevels, currentLevel],
      score: prev.score + 100
    }));
  };

  const renderCurrentLevel = () => {
    switch (currentLevel) {
      case 0:
        return <WelcomeScreen onComplete={advanceLevel} missionData={missionData} />;
      case 1:
        return <Level1 onComplete={advanceLevel} missionData={missionData} />;
      case 2:
        return <Level2 onComplete={advanceLevel} missionData={missionData} />;
      case 3:
        return <Level3 onComplete={advanceLevel} missionData={missionData} />;
      case 4:
        return <Finale missionData={missionData} />;
      default:
        return <WelcomeScreen onComplete={advanceLevel} missionData={missionData} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppContainer>
      <BackgroundParticles />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {renderCurrentLevel()}
        </motion.div>
      </AnimatePresence>
    </AppContainer>
  );
}

export default App; 