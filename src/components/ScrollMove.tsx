import styled from 'styled-components';
import { useState, useEffect } from 'react';

const ScrollMove = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showButtons, setShowButtons] = useState('');

  const handleVisibleBtn = () => {
    const position = window.pageYOffset;
    console.log("Current position:", position); // Debug log
    setScrollPosition(position);
    if (position > 200) {
      setShowButtons('visible');
    } else {
      setShowButtons('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleBtn);

    return () => {
      window.removeEventListener('scroll', handleVisibleBtn);
    };
  }, []);

  const scrollTop = () => {
    console.log("scrollTop called"); // Debug log
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollDown = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <ButtonContainer className={showButtons}>
      <GoTop onClick={scrollTop}>
        <svg width="20" viewBox="0 0 320 450">
          <path d="M168.5 164.2l148 146.8c4.7 4.7 4.7 12.3 0 17l-19.8 19.8c-4.7 4.7-12.3 4.7-17 0L160 229.3 40.3 347.8c-4.7 4.7-12.3 4.7-17 0L3.5 328c-4.7-4.7-4.7-12.3 0-17l148-146.8c4.7-4.7 12.3-4.7 17 0z" />
        </svg>
      </GoTop>
      <GoDown onClick={scrollDown}>
        <svg width="20" viewBox="0 0 320 450">
          <path d="M160 285.8L12 138.8c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0l119.7 118.5L279.7 102c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z" />
        </svg>
      </GoDown>
    </ButtonContainer>
  );
};

export default ScrollMove;

const ButtonContainer = styled.div`
  visibility: hidden;
  opacity: 0.8;
  width: auto;
  position: fixed;
  right: 2.8rem;
  bottom: 7rem;
  z-index: 96;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: transparent;
  transition: 1s ease-in-out;

  &.visible {
    visibility: visible;
  }

  @media (max-width: 460px) {
    bottom: 2.8rem;
  }
`;

const GoTop = styled.div`
  background-color: var(--text);
  fill: var(--ele);
  border-radius: 2rem;
  cursor: pointer;
  padding: 0.15rem 0.5rem;
  transition: 0.3s ease-in-out;
`;

const GoDown = styled.div`
  background-color: var(--text);
  display: flex;
  align-items: center;
  fill: var(--ele);
  border-radius: 2rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: 0.3s ease-in-out;
`;
