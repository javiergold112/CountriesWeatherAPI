import { render, screen } from '@testing-library/react';
import CountryWeather from '../components/CountryWeather';
import useFetch from '../hooks/useFetch';
import '@testing-library/jest-dom';

jest.mock('../hooks/useFetch');

test('renders weather data correctly', () => {
  const mockData = {
    name: 'Paris',
    weather: [{ main: 'Clouds', description: 'overcast clouds', icon: 'cloud' }],
    main: { temp: 18, humidity: 65 },
    clouds: { all: 90 },
    wind: { speed: 5 },
  };

  (useFetch as jest.Mock).mockReturnValue([mockData, null, false]);

  render(<CountryWeather latCountry={48.8566} lonCountry={2.3522} />);

  expect(screen.getByText('Weather Paris')).toBeInTheDocument();
  expect(screen.getByText('Clouds')).toBeInTheDocument();
  expect(screen.getByText('overcast clouds')).toBeInTheDocument();
  expect(screen.getByText('18 °C')).toBeInTheDocument();
});
