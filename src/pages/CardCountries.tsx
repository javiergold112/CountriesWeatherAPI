import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputSearch from '../components/InputSearch';
import FilterBy from '../components/FilterBy';
import SingleCard from '../components/SingleCard';
import LoadSpinner from '../components/LoadSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useCountries } from '../hooks/useCountries';

const CardCountries: React.FC = () => {
   const [query, setQuery] = useState<string>('');
   const [debouncedQuery, setDebouncedQuery] = useState<string>('');
   const [region, setRegion] = useState<string>('all');
   const [sortBy, setSortBy] = useState<string>('name');

   const name = debouncedQuery.length ? debouncedQuery : undefined;
   const regionParam = region !== 'all' ? region : undefined;

   const { data, loading, error } = useCountries(name, regionParam);

   const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      if (/^[A-Za-z\s]*$/.test(newQuery)) {
         setQuery(newQuery);
      }
   };

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedQuery(query);
      }, 300);

      return () => {
         clearTimeout(handler);
      };
   }, [query]);

   const sortedCountries = [...(data?.countries.edges || [])].sort((a, b) => {
      if (sortBy === 'name') {
         return a.node.name.localeCompare(b.node.name);
      }
      if (sortBy === 'population') {
         return b.node.population - a.node.population;
      }
      if (sortBy === 'area') {
         return (b.node.area || 0) - (a.node.area || 0);
      }
      return 0;
   });

   const handleFilterBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedRegion = e.target.value.toLowerCase();
      setRegion(selectedRegion);
   };

   return (
      <>
         <Section>
            <InputSearch query={query} handleQuery={handleQuery} />
            <FilterBy handleFilterBy={handleFilterBy} />
            <SortDropdown
               onChange={(e) => setSortBy(e.target.value)}
               aria-label="sort-by"
            >
               <option value="name">Sort by Name</option>
               <option value="population">Sort by Population</option>
               <option value="area">Sort by Area</option>
            </SortDropdown>
         </Section>

         <CardSection>
            {loading ? (
               <LoadSpinner />
            ) : error ? (
               <ErrorMessage />
            ) : (
               <SingleCard data={{ countries: { edges: sortedCountries } }} />
            )}
         </CardSection>
      </>
   );
};

export default CardCountries;

const Section = styled.section`
   display: flex;
   justify-content: space-between;
   margin-bottom: 2rem;
   @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
   }
`;

const SortDropdown = styled.select`
   min-width: 12rem;
   padding: 1rem;
   border-radius: 0.3rem;
   background-color: var(--ele);
   color: var(--text);
   box-shadow: 0 0 0.2rem var(--shadow);
   cursor: pointer;
   @media (max-width: 460px) {
      min-width: 56vw;
   }
`;

const CardSection = styled.section`
   grid-template-columns: repeat(4, 1fr) !important; 
   gap: 1.5rem !important; 
   @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr) !important; 
   }
   @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr) !important; 
   }
   @media (max-width: 520px) {
      padding-inline: 1.8rem;
      grid-template-columns: 1fr !important; 
   }
`;
