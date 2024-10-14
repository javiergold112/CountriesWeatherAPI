import { render, screen, within } from '@testing-library/react';
import CountryDetails from '../components/CountryDetails';
import '@testing-library/jest-dom';

const mockData = {
  name: 'Italy',
  nativeName: 'Italia',
  flag: 'italy-flag-url',
  population: 60000000,
  region: 'Europe',
  subregion: 'Southern Europe',
  capital: 'Rome',
  topLevelDomain: ['.it'],
  languages: { edges: [{ node: { name: 'Italian' } }] },
  currencies: { edges: [{ node: { name: 'Euro', code: 'EUR' } }] },
  borders: ['FR', 'AT', 'CH'],
  alpha3Code: 'ITA',
  area: 301340,
};

test('renders country details with provided data', () => {
  render(<CountryDetails data={mockData} />);

  const countryName = screen.getByRole('heading', { level: 1 });
  expect(countryName).toHaveTextContent('Italy');

  expect(screen.getByText(/Population:/)).toBeInTheDocument();
  expect(screen.getByText('Europe')).toBeInTheDocument();
  expect(screen.getByText('60,000,000')).toBeInTheDocument();
  const regionElement = screen.getByText('Region:', { selector: 'strong' });
  const regionLi = regionElement.closest('li');
  expect(within(regionLi as HTMLElement).getByText('Europe')).toBeInTheDocument();
  const capitalElement = screen.getByText('Capital:', { selector: 'strong' });
  const capitalLi = capitalElement.closest('li');
  expect(within(capitalLi as HTMLElement).getByText('Rome')).toBeInTheDocument();
  const languagesElement = screen.getByText('Languages:', { selector: 'strong' });
  const languages = languagesElement.closest('li');
  expect(within(languages as HTMLElement).getByText('Italian')).toBeInTheDocument();
  const currenciesElement = screen.getByText('Currencies:', { selector: 'strong' });
  const currenciesLi = currenciesElement.closest('li');
  expect(within(currenciesLi as HTMLElement).getByText(/Euro\s*\(EUR\)/i)).toBeInTheDocument();
});
