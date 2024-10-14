import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';

interface CountryNode {
   name: string;
   flag: string;
   population: number;
   region: string;
   alpha3Code: string;
   id?: string;
   capital?: string;
}

interface Edge {
   node: CountryNode;
}

interface CountriesData {
   countries: {
      edges: Edge[];
   };
}

interface SingleCardProps {
   data?: CountriesData;
}

const SingleCard: React.FC<SingleCardProps> = ({ data }) => {
   return (
      <>
         {data?.countries.edges.map(({ node }: Edge) => (
            <DivCard key={node.id}>
               <Link to={`/${node.id}`}>
                  <img src={node.flag} alt={`${node.name} Flag`} />
               </Link>
               <div>
                  <Link to={`/${node.id}`}>
                     <h2>{node.name}</h2>
                  </Link>
                  <ul>
                     <li>
                        <strong>Population:</strong> {node.population.toLocaleString()}
                     </li>
                     <li>
                        <strong>Region:</strong> {node.region}
                     </li>
                     <li>
                        <strong>Capital:</strong> {node.capital || 'No Capital'}
                     </li>
                  </ul>
               </div>
            </DivCard>
         ))}
      </>
   );
};

export default SingleCard;

const DivCard = styled.div`
   max-width: 32rem;
   border-radius: 0.5rem;
   background-color: var(--ele);
   box-shadow: 0 0 0.2rem var(--shadow);
   overflow: hidden;
   transition: transform 0.4s ease-out;
   &:hover {
      transform: scale(1.05);
   }
   img {
      width: 100%;
      height: 200px;
      object-fit: cover;
   }
   div {
      padding: 1.5rem;
      padding-bottom: 2rem;
   }
   h2 {
      font-size: 1.35rem;
      margin-bottom: 0.8rem;
   }
   ul {
      list-style: none;
      padding: 0;
      li {
         margin-bottom: 0.5rem;
         strong {
            font-weight: 600;
         }
      }
   }
`;
