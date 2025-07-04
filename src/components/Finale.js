import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FinaleContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const Confetti = styled(motion.div)`
  position: fixed;
  width: 10px;
  height: 10px;
  background: ${props => props.color};
  top: -10px;
  left: ${props => props.left}px;
  z-index: 0;
`;

const FinaleTitle = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #4a90e2, #00d4ff, #ff6b9d, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(74, 144, 226, 0.5);
`;

const Subtitle = styled(motion.h2)`
  font-family: 'Orbitron', monospace;
  font-size: 1.8rem;
  color: #00d4ff;
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CelebrationCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.9);
  border: 3px solid #4a90e2;
  border-radius: 20px;
  padding: 3rem;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 0 50px rgba(74, 144, 226, 0.4);
  backdrop-filter: blur(15px);
  text-align: center;
`;

const BirthdayMessage = styled(motion.div)`
  font-family: 'Roboto', sans-serif;
  font-size: 1.3rem;
  line-height: 1.8;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
`;

const AgentName = styled.span`
  color: #4a90e2;
  font-weight: bold;
  font-size: 1.5rem;
  text-shadow: 0 0 15px #4a90e2;
`;

const EmojiDisplay = styled(motion.div)`
  font-size: 4rem;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PhotoCollage = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PhotoFrame = styled(motion.div)`
  aspect-ratio: 1;
  background: linear-gradient(45deg, #4a90e2, #00d4ff);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
  border: 2px solid #4a90e2;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
`;

const PhotoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  
  .icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const CollageTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.4rem;
  color: #4a90e2;
  text-align: center;
  margin: 2rem 0 1rem 0;
  text-shadow: 0 0 10px #4a90e2;
`;



const RestartButton = styled(motion.button)`
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
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.5);
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 40px rgba(74, 144, 226, 0.7);
  }
`;

const Finale = ({ missionData }) => {
  const [confetti, setConfetti] = useState([]);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    // Create confetti
    const colors = ['#4a90e2', '#00d4ff', '#ff6b9d', '#ffd700', '#00ff88'];
    const newConfetti = [];
    
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * window.innerWidth,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4
      });
    }
    
    setConfetti(newConfetti);
    
    // Show restart button after 5 seconds
    setTimeout(() => {
      setShowRestart(true);
    }, 5000);
  }, []);

  const handleRestart = () => {
    window.location.reload();
  };

  const photoData = [
    { id: 1, delay: 0.1, photoUrl: "photos\photo1.jpg" },
    { id: 2, delay: 0.2, photoUrl: "photos\photo2.jpg" },
    { id: 3, delay: 0.3, photoUrl: "photos\photo3.jpg" },
    { id: 4, delay: 0.4, photoUrl: "photos\photo4.jpg" },
    { id: 5, delay: 0.5, photoUrl: "photos\photo5.jpg" },
    { id: 6, delay: 0.6, photoUrl: "photos\photo6.jpg" }
  ];

  return (
    <FinaleContainer>
      {/* Confetti Animation */}
      {confetti.map((piece) => (
        <Confetti
          key={piece.id}
          color={piece.color}
          left={piece.left}
          initial={{ y: -10, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 10, 
            rotate: 360,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn"
          }}
        />
      ))}
      
      <FinaleTitle
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        🎉 HAPPY BIRTHDAY YOUNG MAN!! 🎉
      </FinaleTitle>
      
      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
      CHAPTER 4: THE BIRTHDAY REVEAL

      </Subtitle>
      
      <CelebrationCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <BirthdayMessage>
          Congratulations, <AgentName>{missionData.agentName}</AgentName>! 
          You've successfully unlocked the ultimate birthday surprise! 
          You've proven that age is just a number! 🕵️‍♀️
        </BirthdayMessage>
        
        <BirthdayMessage>
          Solving these puzzles was just a warm up for the 50 year old you! <br></br>
          Stay young, stay fit, stay happy!😁
        </BirthdayMessage>
        
        <BirthdayMessage>
          <strong>HAPPY BIRTHDAY!</strong> 🎂
          <br />
          Feelin old yet?😂
        </BirthdayMessage>
        
        <EmojiDisplay
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
        </EmojiDisplay>


        
        <CollageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          📸 SAY CHEESE! 📸
        </CollageTitle>
        
        <PhotoCollage
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 3.8 }}
        >
          {photoData.map((photo, index) => (
            <PhotoFrame
              key={photo.id}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 3.8 + (index * 0.1),
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "0 0 30px rgba(74, 144, 226, 0.6)"
              }}

            >
              <PhotoPlaceholder>
                {photo.photoUrl ? (
                  <img 
                    src={photo.photoUrl} 
                    alt={`Photo ${photo.id}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '13px'
                    }}
                  />
                ) : (
                  <>
                    <div className="icon">📸</div>
                    <div>Photo {photo.id}</div>
                  </>
                )}
              </PhotoPlaceholder>
            </PhotoFrame>
          ))}
        </PhotoCollage>
        
        {showRestart && (
          <RestartButton
            onClick={handleRestart}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

          >
            PLAY AGAIN
          </RestartButton>
        )}
      </CelebrationCard>


    </FinaleContainer>
  );
};

export default Finale; 