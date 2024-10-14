import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '../graphql/getCountry';


export const useCountry = (id: string) => {
    const { data, loading, error } = useQuery(GET_COUNTRY, {
      variables: { id }, 
    });
  
    return { data, loading, error };
  };
