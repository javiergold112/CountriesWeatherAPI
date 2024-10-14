import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';

interface LanguageNode {
  name: string;
}

interface CurrencyNode {
  name: string;
  code: string;
}

interface CountryNode {
  name: string;
  nativeName: string;
  flag: string;
  population: number;
  region: string;
  subregion: string;
  alpha3Code: string;
  id?: string;
  capital?: string;
  area: number;
  latLng?: [number, number];
  topLevelDomain?: string[];
  languages?: {
    edges: {
      node: LanguageNode;
    }[];
  };
  currencies?: {
    edges: {
      node: CurrencyNode;
    }[];
  };
  timezones?: string[];
  borders?: string[];
}

interface CountryDetailsProps {
  data: CountryNode;
  dataAll?: CountryNode[];
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ data, dataAll }) => {
  const joinObjData = (objData: { edges: { node: { name: string } }[] }) =>
    objData.edges.map((obj) => obj.node.name).join(', ');

  const langs = data.languages ? joinObjData(data.languages) : 'No Languages';
  const currencies = data.currencies ? joinObjData(data.currencies) : 'No Currencies';
  const timezones = data.timezones ? data.timezones.join(', ') : 'No Timezones';
  const currCode = data.currencies
    ? data.currencies.edges.map(edge => edge.node.code).join(', ')
    : 'No Currencies';
  const borderList = data.borders?.join(', ') || 'No Borders';

  return (
    <>
      <DivFlag>
        <img src={data.flag} alt={`${data.name} Flag`} />
      </DivFlag>
      <div>
        <h1>{data.name}</h1>
        <DivUlInfo>
          <ul>
            <li><strong>Native Name:</strong> {data.nativeName}</li>
            <li><strong>Population:</strong> {data.population.toLocaleString()}</li>
            <li><strong>Region:</strong> {data.region}</li>
            <li><strong>Sub Region:</strong> {data.subregion}</li>
            <li><strong>Capital:</strong> {data.capital ?? 'No Capital'}</li>
          </ul>
          <ul>
            <li><strong>Area:</strong> {data.area}</li>
            <li><strong>Top Level Domain:</strong> {data.topLevelDomain?.[0] || 'None'}</li>
            <li><strong>Currencies:</strong> {currencies} ({currCode})</li>
            <li><strong>Languages:</strong> {langs}</li>
            <li><strong>Time zones:</strong> {timezones}</li>
          </ul>
        </DivUlInfo>

        <DivBorders>
          <p><strong>Neighbouring Countries:</strong></p>
          <ul>
            {borderList !== 'No Borders' ? (
              data.borders?.map((borderCode) => {
                const borderCountry = dataAll?.find(country => country.alpha3Code === borderCode);
                return borderCountry ? (
                  <li key={borderCode}>
                    <Link to={`/${borderCountry.id}`}>{borderCountry.name}</Link>
                  </li>
                ) : (
                  <li key={borderCode}>{borderCode}</li>
                );
              })
            ) : (
              <NoBorderLi>No Border Countries</NoBorderLi>
            )}
          </ul>
        </DivBorders>
      </div>
    </>
  );
};


export default CountryDetails;

const DivFlag = styled.div`
  img {
    border: 1px solid gray;
    border-radius: 4px;
    width: 100%;
    height: auto;
  }
`;


const DivUlInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 0;
  }
  
  ul {
    width: 50%;
    
    @media (max-width: 460px) {
      width: 100%;
    }
    
    li {
      padding-bottom: 0.8rem;
    }
  }
`;

const DivBorders = styled.div`
  ul {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.8rem;
    max-width: calc(100% - 10rem);
    padding-left: 0.8rem;
  }
`;

const NoBorderLi = styled.li`
  padding-inline: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
`;
