import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LevelContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const LevelTitle = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 1rem;
  color: #4a90e2;
  text-shadow: 0 0 20px #4a90e2;
`;

const LevelSubtitle = styled(motion.h2)`
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const GameCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.9);
  border: 2px solid #4a90e2;
  border-radius: 15px;
  padding: 2.5rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.3);
  backdrop-filter: blur(10px);
`;

const GameText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
`;

const MemoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const MemoryCard = styled(motion.div)`
  background: ${props => props.revealed ? 'linear-gradient(45deg, #4a90e2, #00d4ff)' : 'rgba(74, 144, 226, 0.2)'};
  border: 2px solid #4a90e2;
  border-radius: 10px;
  padding: 1.5rem;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.revealed ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: ${props => props.revealed ? 'none' : 'scale(1.05)'};
    box-shadow: ${props => props.revealed ? '0 0 20px rgba(74, 144, 226, 0.5)' : '0 0 15px rgba(74, 144, 226, 0.4)'};
  }
`;

const CardContent = styled.div`
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: #ffffff;
  line-height: 1.4;
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(74, 144, 226, 0.2);
  border-radius: 3px;
  margin: 2rem 0;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #00d4ff);
  border-radius: 3px;
`;

const ContinueButton = styled(motion.button)`
  background: linear-gradient(45deg, #4a90e2, #00d4ff);
  border: none;
  border-radius: 50px;
  padding: 1rem 3rem;
  font-family: 'Orbitron', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.4);
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(74, 144, 226, 0.6);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Level2 = ({ onComplete, missionData }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [canFlip, setCanFlip] = useState(true);
  const [memoryCards, setMemoryCards] = useState([
    { id: 1, emoji: '🎂', pairId: 1 },
    { id: 2, emoji: '🎁', pairId: 2 },
    { id: 3, emoji: '🎈', pairId: 3 },
    { id: 4, emoji: '🎊', pairId: 4 },
    { id: 5, emoji: '🎆', pairId: 5 },
    { id: 6, emoji: '🎉', pairId: 6 },
    { id: 7, emoji: '🎂', pairId: 1 },
    { id: 8, emoji: '🎁', pairId: 2 },
    { id: 9, emoji: '🎈', pairId: 3 },
    { id: 10, emoji: '🎊', pairId: 4 },
    { id: 11, emoji: '🎆', pairId: 5 },
    { id: 12, emoji: '🎉', pairId: 6 }
  ]);

  const startGame = () => {
    setGameStarted(true);
    // Shuffle cards
    const shuffled = [...memoryCards].sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
  };

  const flipCard = (cardId) => {
    if (!canFlip || flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setCanFlip(false);
      const [firstId, secondId] = newFlipped;
      const firstCard = memoryCards.find(card => card.id === firstId);
      const secondCard = memoryCards.find(card => card.id === secondId);

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs([...matchedPairs, firstId, secondId]);
        setFlippedCards([]);
        setCanFlip(true);
        
        // Check if all pairs are matched
        if (matchedPairs.length + 2 === memoryCards.length) {
          setTimeout(() => setShowContinue(true), 1000);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const progress = (matchedPairs.length / memoryCards.length) * 100;

  return (
    <LevelContainer>
      <LevelTitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        CHAPTER 2: THE MEMORY GAME
      </LevelTitle>
      
      <LevelSubtitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        MATCH THE BIRTHDAY PAIRS
      </LevelSubtitle>
      
      <GameCard
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <GameText>
          Agent {missionData.agentName}, test your memory skills! 
          Find matching pairs of birthday items. 
          Click on cards to flip them and find all 6 pairs! 🧠
        </GameText>
        
        {!gameStarted ? (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <ContinueButton
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START MEMORY GAME
            </ContinueButton>
          </div>
        ) : (
          <>
            <ProgressBar>
              <ProgressFill
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </ProgressBar>
            
            <GameText>
              Progress: {matchedPairs.length / 2} / 6 pairs matched! 🎯
            </GameText>
            
            <MemoryGrid style={{ gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: '600px' }}>
              {memoryCards.map((card) => (
                <MemoryCard
                  key={card.id}
                  revealed={flippedCards.includes(card.id) || matchedPairs.includes(card.id)}
                  onClick={() => flipCard(card.id)}
                  whileHover={{ scale: (flippedCards.includes(card.id) || matchedPairs.includes(card.id)) ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: card.id * 0.05 }}
                  style={{ 
                    minHeight: '100px',
                    background: (flippedCards.includes(card.id) || matchedPairs.includes(card.id)) 
                      ? 'linear-gradient(45deg, #4a90e2, #00d4ff)' 
                      : 'rgba(74, 144, 226, 0.2)'
                  }}
                >
                  <CardContent>
                    {(flippedCards.includes(card.id) || matchedPairs.includes(card.id)) ? (
                      <div style={{ fontSize: '2rem' }}>{card.emoji}</div>
                    ) : (
                      <div style={{ fontSize: '2rem', opacity: 0.7 }}>❓</div>
                    )}
                  </CardContent>
                </MemoryCard>
              ))}
            </MemoryGrid>
          </>
        )}
        
        {showContinue && (
          <ContinueButton
            onClick={onComplete}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTINUE MISSION
          </ContinueButton>
        )}
      </GameCard>
    </LevelContainer>
  );
};

export default Level2; 