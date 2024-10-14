import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import LoadSpinner from '../components/LoadSpinner';
import BtnBack from '../components/BtnBack';
import BtnHome from '../components/BtnHome'; 
import ErrorMessage from '../components/ErrorMessage';
import CountryDetails from '../components/CountryDetails';
import CountryWeather from '../components/CountryWeather';
import CountryMaps from '../components/CountryMaps';
import { useCountry } from '../hooks/useCountry';
import { useCountries } from '../hooks/useCountries';

const Country: React.FC = () => {
  const { code } = useParams<Record<string, string>>();
  const { data, loading, error } = useCountry(code as string);
  const { data: dataAll } = useCountries();
  
  const AllDatas = dataAll?.countries.edges.map((country) => country.node);
  const country = data?.country;
  const latCountry = country?.latLng?.[0];
  const lonCountry = country?.latLng?.[1];

  return (
    <>
      <ButtonContainer>
        <BtnBack />
        <BtnHome /> 
      </ButtonContainer>
      {loading ? (
        <LoadSpinner />
      ) : error ? (
        <ErrorMessage />
      ) : country ? (
        <Section>
          <CountryDetails data={country} dataAll={AllDatas} />
          {latCountry != null && lonCountry != null && (
            <>
              <CountryWeather latCountry={latCountry} lonCountry={lonCountry} />
              <CountryMaps lat={latCountry} lon={lonCountry} />
            </>
          )}
        </Section>
      ) : (
        <ErrorMessage />
      )}
    </>
  );
};

export default Country;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
