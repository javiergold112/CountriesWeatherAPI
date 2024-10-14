import { gql } from '@apollo/client';

export const GET_COUNTRY = gql`
  query GetCountry($id: ID!) {
    country(id: $id) {
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
          timezones
          topLevelDomain
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
`;
