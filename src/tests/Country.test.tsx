import { render, screen } from '@testing-library/react';
import Country from '../pages/Country';
import { useCountry } from '../hooks/useCountry';
import { useCountries } from '../hooks/useCountries';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../hooks/useCountry');
jest.mock('../hooks/useCountries');

jest.mock('../components/LoadSpinner', () => ({
  __esModule: true,
  default: () => <div data-testid="load-spinner">Loading...</div>,
}));

jest.mock('../components/ErrorMessage', () => ({
  __esModule: true,
  default: () => <div data-testid="error-message">Error occurred</div>,
}));

jest.mock('../components/BtnBack', () => ({
  __esModule: true,
  default: () => <button data-testid="btn-back">Back</button>,
}));

jest.mock('../components/BtnHome', () => ({
  __esModule: true,
  default: () => <button data-testid="btn-home">Home</button>,
}));

jest.mock('../components/CountryDetails', () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div data-testid="country-details">
      <h1>{data.name}</h1>
      <p>Population: {data.population}</p>
    </div>
  ),
}));

jest.mock('../components/CountryWeather', () => ({
  __esModule: true,
  default: ({ latCountry, lonCountry }: any) => (
    <div data-testid="country-weather">
      Weather at ({latCountry}, {lonCountry})
    </div>
  ),
}));

jest.mock('../components/CountryMaps', () => ({
  __esModule: true,
  default: ({ lat, lon }: any) => (
    <div data-testid="country-maps">
      Maps at ({lat}, {lon})
    </div>
  ),
}));

describe('Country Component', () => {
  const mockUseCountry = useCountry as jest.Mock;
  const mockUseCountries = useCountries as jest.Mock;

  const mockCountryData = {
    country: {
      code: 'US',
      name: 'United States',
      population: 331000000,
      latLng: [38.0, -97.0],
    },
  };

  const mockAllCountries = {
    countries: {
      edges: [
        { node: { code: 'US', name: 'United States' } },
        { node: { code: 'CA', name: 'Canada' } },
      ],
    },
  };

  const renderWithRouter = (code: string) => {
    render(
      <MemoryRouter initialEntries={[`/country/${code}`]}>
        <Routes>
          <Route path="/country/:code" element={<Country />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockUseCountry.mockReturnValue({
      data: mockCountryData,
      loading: false,
      error: null,
    });

    mockUseCountries.mockReturnValue({
      data: mockAllCountries,
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders navigation buttons', () => {
    renderWithRouter('US');

    expect(screen.getByTestId('btn-back')).toBeInTheDocument();
    expect(screen.getByTestId('btn-home')).toBeInTheDocument();
  });

  test('displays loading spinner when loading', () => {
    mockUseCountry.mockReturnValueOnce({
      data: null,
      loading: true,
      error: null,
    });

    renderWithRouter('US');

    expect(screen.getByTestId('load-spinner')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    mockUseCountry.mockReturnValueOnce({
      data: null,
      loading: false,
      error: 'Failed to fetch',
    });

    renderWithRouter('US');

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  test('renders country details when data is available', () => {
    renderWithRouter('US');

    expect(screen.getByTestId('country-details')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Population: 331000000')).toBeInTheDocument();
  });

  test('renders weather and maps when lat and lon are available', () => {
    renderWithRouter('US');

    expect(screen.getByTestId('country-weather')).toBeInTheDocument();
    expect(screen.getByTestId('country-weather')).toHaveTextContent('Weather at (38, -97)');
    expect(screen.getByTestId('country-maps')).toBeInTheDocument();
    expect(screen.getByTestId('country-maps')).toHaveTextContent('Maps at (38, -97)');
  });

  test('does not render weather and maps if lat or lon is missing', () => {
    mockUseCountry.mockReturnValueOnce({
      data: {
        country: {
          code: 'US',
          name: 'United States',
          population: 331000000,
          latLng: [null, -97.0],
        },
      },
      loading: false,
      error: null,
    });

    renderWithRouter('US');

    expect(screen.queryByTestId('country-weather')).not.toBeInTheDocument();
    expect(screen.queryByTestId('country-maps')).not.toBeInTheDocument();
  });

  test('renders error message if country data is null', () => {
    mockUseCountry.mockReturnValueOnce({
      data: null,
      loading: false,
      error: null,
    });

    renderWithRouter('US');

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
