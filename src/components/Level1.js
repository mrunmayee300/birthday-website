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

const PuzzleCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.9);
  border: 2px solid #4a90e2;
  border-radius: 15px;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.3);
  backdrop-filter: blur(10px);
`;

const PuzzleText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
`;

const SequenceDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const SequenceNumber = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: ${props => props.revealed ? 'linear-gradient(45deg, #4a90e2, #00d4ff)' : 'rgba(74, 144, 226, 0.2)'};
  border: 2px solid #4a90e2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  cursor: ${props => props.revealed ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: ${props => props.revealed ? 'none' : 'scale(1.1)'};
    box-shadow: ${props => props.revealed ? '0 0 20px rgba(74, 144, 226, 0.5)' : '0 0 15px rgba(74, 144, 226, 0.4)'};
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const AnswerInput = styled.input`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #4a90e2;
  border-radius: 10px;
  padding: 1rem;
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  width: 200px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 20px rgba(74, 144, 226, 0.5);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, #4a90e2, #00d4ff);
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.4);
  
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

const Message = styled(motion.div)`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ${props => props.success ? '#00ff88' : '#ff6b6b'};
  text-align: center;
  margin-top: 1rem;
  text-shadow: 0 0 10px ${props => props.success ? '#00ff88' : '#ff6b6b'};
`;

const Level1 = ({ onComplete, missionData }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  
  // Caesar cipher: "HAPPY BIRTHDAY" shifted by 3
  const encodedMessage = "gnaturbgez muz etug sella";
  const correctAnswer = 'happy birthday';

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage('Excellent! You\'ve decoded the mysterious message!');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setMessage('Try again! Think about translating it to English...');
      setUserAnswer('');
    }
  };

  const showHintFunction = () => {
    setShowHint(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <LevelContainer>
      <LevelTitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        CHAPTER 1: THE MYSTERIOUS MESSAGE
      </LevelTitle>
      
      <LevelSubtitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        DECODE THE SECRET
      </LevelSubtitle>
      
      <PuzzleCard
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
                <PuzzleText>
          Agent {missionData.agentName}, a mysterious encoded message has appeared on your screen! 
          Can you decode this secret message to move forward? 🔍
        </PuzzleText>
        
        <div style={{ 
          background: 'rgba(74, 144, 226, 0.1)', 
          border: '2px solid #4a90e2', 
          borderRadius: '15px', 
          padding: '2rem', 
          margin: '2rem 0',
          textAlign: 'center',
          fontFamily: 'Orbitron, monospace',
          fontSize: '1.5rem',
          color: '#00d4ff',
          letterSpacing: '3px'
        }}>
          {encodedMessage}
        </div>
        
        <InputContainer>
          <PuzzleText>
            Decode the message and type your answer below:
          </PuzzleText>
          <AnswerInput
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter decoded message..."
            autoFocus
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <SubmitButton
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DECODE MESSAGE
            </SubmitButton>
            <SubmitButton
              onClick={showHintFunction}
              style={{ background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET HINT
            </SubmitButton>
          </div>
        </InputContainer>
        
        {showHint && (
          <div style={{ 
            background: 'rgba(255, 215, 0, 0.1)', 
            border: '1px solid #ffd700', 
            borderRadius: '10px', 
            padding: '1rem', 
            margin: '1rem 0',
            textAlign: 'center',
            color: '#ffd700'
          }}>
            💡 Hint: Translate it to English!
          </div>
        )}
        
        {message && (
          <Message
            success={message.includes('Correct')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </Message>
        )}
      </PuzzleCard>
    </LevelContainer>
  );
};

export default Level1; 