import styled from 'styled-components';
import DotLoader from 'react-spinners/HashLoader';

const LoadSpinner = () => {
   return (
      <DivLoading>
         <DotLoader size={100} color={'silver'} />
         <h1>Loading...</h1>
      </DivLoading>
   );
}

export default LoadSpinner;

const DivLoading = styled.div`
   width: 100%;
   padding-top: 3rem;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 1rem;
`;
