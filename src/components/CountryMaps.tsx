import styled from 'styled-components';
import React from 'react';

interface CountryMapsProps {
   lat: number;
   lon: number;
}

const CountryMaps: React.FC<CountryMapsProps> = ({ lat, lon }) => {
   return (
     <IframeMaps
       data-testid="country-maps-iframe"
       src={`https://www.google.com/maps?z=5&ie=UTF8&iwloc=&output=embed&q=${lat},${lon}`}
       frameBorder={0}
       scrolling="no"
       marginHeight={0}
       marginWidth={0}
     />
   );
 };
 

export default CountryMaps;

const IframeMaps = styled.iframe`
  width: 100%;
  aspect-ratio: 3 / 2;
  transition: 2s ease-in-out;

  @media (max-width: 460px) {
    aspect-ratio: 1;
  }
`;
