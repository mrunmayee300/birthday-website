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
  max-width: 900px;
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

const MatchingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ColumnTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.3rem;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #4a90e2;
`;

const MatchItem = styled(motion.div)`
  background: ${props => props.isSelected ? 'linear-gradient(45deg, #4a90e2, #00d4ff)' : 'rgba(74, 144, 226, 0.2)'};
  border: 2px solid #4a90e2;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #ffffff;
  text-align: center;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 15px rgba(74, 144, 226, 0.4);
  }
  
  ${props => props.isMatched && `
    background: linear-gradient(45deg, #00ff88, #00d4ff);
    border-color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  `}
`;

const Instructions = styled.div`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid #4a90e2;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
`;

const CompleteButton = styled(motion.button)`
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

const SuccessMessage = styled(motion.div)`
  color: #00ff88;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  margin-top: 1rem;
  text-shadow: 0 0 10px #00ff88;
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

const Level3 = ({ onComplete, missionData }) => {
  const [selectedBand, setSelectedBand] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  
  const musicPairs = [
    { id: 1, band: "Bon Jovi", song: "Livin' on a Prayer", year: "1986" },
    { id: 2, band: "Guns N' Roses", song: "Sweet Child o' Mine", year: "1987" },
    { id: 3, band: "The Police", song: "Every Breath You Take", year: "1983" },
    { id: 4, band: "U2", song: "With or Without You", year: "1987" },
    { id: 5, band: "Journey", song: "Don't Stop Believin'", year: "1981" },
    { id: 6, band: "Toto", song: "Africa", year: "1982" },
    { id: 7, band: "Survivor", song: "Eye of the Tiger", year: "1982" }
  ];
  
  const [shuffledSongs, setShuffledSongs] = useState([]);
  
  const startGame = () => {
    setGameStarted(true);
    // Shuffle songs
    const songs = musicPairs.map(pair => ({ ...pair }));
    const shuffled = songs.sort(() => Math.random() - 0.5);
    setShuffledSongs(shuffled);
  };
  
  const handleBandClick = (bandId) => {
    if (matchedPairs.includes(bandId)) return;
    
    if (selectedBand === bandId) {
      setSelectedBand(null);
    } else {
      setSelectedBand(bandId);
    }
    setSelectedSong(null);
  };
  
  const handleSongClick = (songId) => {
    if (matchedPairs.includes(songId)) return;
    
    if (selectedSong === songId) {
      setSelectedSong(null);
    } else {
      setSelectedSong(songId);
    }
  };
  
  useEffect(() => {
    if (selectedBand && selectedSong) {
      // Check if the match is correct
      const bandPair = musicPairs.find(pair => pair.id === selectedBand);
      const songPair = shuffledSongs.find(pair => pair.id === selectedSong);
      
      if (bandPair && songPair && bandPair.id === songPair.id) {
        // Correct match!
        setMatchedPairs([...matchedPairs, selectedBand, selectedSong]);
        setSelectedBand(null);
        setSelectedSong(null);
        
        // Check if all pairs are matched
        if (matchedPairs.length + 2 === musicPairs.length * 2) {
          setTimeout(() => setShowContinue(true), 1000);
        }
      } else {
        // Wrong match, reset after delay
        setTimeout(() => {
          setSelectedBand(null);
          setSelectedSong(null);
        }, 1000);
      }
    }
  }, [selectedBand, selectedSong, matchedPairs, musicPairs, shuffledSongs]);
  
  const progress = (matchedPairs.length / (musicPairs.length * 2)) * 100;
  
  const isItemSelected = (itemId) => selectedBand === itemId || selectedSong === itemId;
  const isItemMatched = (itemId) => matchedPairs.includes(itemId);
  
  return (
    <LevelContainer>
      <LevelTitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        CHAPTER 3: THE MUSIC MATCHER
      </LevelTitle>
      
      <LevelSubtitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        MATCH BANDS TO THEIR HIT SONGS
      </LevelSubtitle>
      
      <GameCard
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <GameText>
          Agent {missionData.agentName}, test your music knowledge! 
          Match each legendary band to their iconic hit song from the 80s and 90s.
          Click a band, then click the matching song! 🎵
        </GameText>
        
        {!gameStarted ? (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <CompleteButton
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START MUSIC MATCHER
            </CompleteButton>
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
              Progress: {matchedPairs.length / 2} / {musicPairs.length} pairs matched! 🎯
            </GameText>
            
            <MatchingContainer>
              <Column>
                <ColumnTitle>🎸 LEGENDARY BANDS</ColumnTitle>
                {musicPairs.map((pair) => (
                  <MatchItem
                    key={pair.id}
                    onClick={() => handleBandClick(pair.id)}
                    isSelected={isItemSelected(pair.id)}
                    isMatched={isItemMatched(pair.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: pair.id * 0.1 }}
                  >
                    {pair.band}
                  </MatchItem>
                ))}
              </Column>
              
              <Column>
                <ColumnTitle>🎵 ICONIC SONGS</ColumnTitle>
                {shuffledSongs.map((pair) => (
                  <MatchItem
                    key={pair.id}
                    onClick={() => handleSongClick(pair.id)}
                    isSelected={isItemSelected(pair.id)}
                    isMatched={isItemMatched(pair.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: pair.id * 0.1 }}
                  >
                    "{pair.song}" ({pair.year})
                  </MatchItem>
                ))}
              </Column>
            </MatchingContainer>
            
            <Instructions>
              <strong>How to play:</strong> Click a band from the left, then click its matching song from the right.
              <br />
              <strong>Goal:</strong> Match all 7 legendary bands to their hit songs!
            </Instructions>
          </>
        )}
        
        {showContinue && (
          <SuccessMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Amazing! You've matched all the legendary bands to their hit songs! 🎉
          </SuccessMessage>
        )}
        
        {showContinue && (
          <CompleteButton
            onClick={onComplete}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTINUE MISSION
          </CompleteButton>
        )}
      </GameCard>
    </LevelContainer>
  );
};

export default Level3; 