import { gql } from '@apollo/client';

export const GET_FILTERED_COUNTRIES = gql`
  query GetFilteredCountries($name: String, $region: String) {
    countries(name_Icontains: $name, region_Icontains: $region) {
      edges {
        node {
          id
          name
          nativeName
          alpha3Code
          area
          flag
          population
          region
          subregion
          capital
          latLng
          topLevelDomain
          timezones
          languages {
            edges {
              node {
                name
              }
            }
          }
          currencies {
            edges {
              node {
                name
                code
              }
            }
          }
          borders
        }
      }
    }
  }
`;
