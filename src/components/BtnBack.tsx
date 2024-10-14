import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BtnBack: React.FC = () => {
   const navigate = useNavigate();
   const handleBack = () => {
      if (window.history.length === 2 && window.history.state.idx === 0) {
         navigate('/');
      } else {
         navigate(-1)
      }
   }
   return (
      <section>
         <BackButton onClick={() => handleBack()}>
            Back
         </BackButton>
      </section>
   );
};

export default BtnBack;

const BackButton = styled.button`
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
