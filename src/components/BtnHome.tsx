import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BtnHome: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <section>
            <HomeButton onClick={handleClick}>
                Home
            </HomeButton>
        </section>
    );
};

export default BtnHome;

const HomeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1.5rem 0.8rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0.3rem;
  font-size: 1.1rem;
  background-color: var(--ele);
  color: var(--txt);
  box-shadow: 0 0 0.4rem var(--shadow);
  cursor: pointer;
  svg {
    width: 1.2rem;
    position: relative;
    left: -1rem;
  }
`;
