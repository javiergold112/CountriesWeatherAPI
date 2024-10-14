import { useQuery } from '@apollo/client';
import { GET_FILTERED_COUNTRIES } from '../graphql/getAllcountries';

interface CountryNode {
  name: string;
  nativeName: string;
  flag: string;
  population: number;
  region: string;
  subregion: string;
  alpha3Code: string;
  capital?: string;
  area: number;
  latLng?: [number, number];
  timezones?: string[];
  topLevelDomain?: string[];
  languages?: {
    edges: {
      node: {
        name: string;
      };
    }[];
  };
  currencies?: {
    edges: {
      node: {
        name: string;
        code: string;
      };
    }[];
  };
  borders?: string[];
}

interface Edge {
  node: CountryNode;
}

interface CountriesData {
  countries: {
    edges: Edge[];
  };
}

interface CountriesVars {
  name?: string;
  region?: string;
}

export const useCountries = (name?: string, region?: string) => {

  const { data, loading, error } = useQuery<CountriesData, CountriesVars>(
    GET_FILTERED_COUNTRIES,
    {
      variables: { name, region },
    }
  );

  return { data, loading, error };
};

  