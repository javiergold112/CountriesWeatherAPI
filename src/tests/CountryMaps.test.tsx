import { render, screen } from '@testing-library/react';
import CountryMaps from '../components/CountryMaps';
import '@testing-library/jest-dom';

test('renders CountryMaps with correct Google Maps URL', () => {
  const lat = 51.5074;
  const lon = -0.1278;

  render(<CountryMaps lat={lat} lon={lon} />);

  const iframeElement = screen.getByTestId('country-maps-iframe');

  expect(iframeElement).toBeInTheDocument();

  expect(iframeElement).toHaveAttribute(
    'src',
    `https://www.google.com/maps?q=${lat},${lon}&z=5&ie=UTF8&iwloc=&output=embed`
  );
});
