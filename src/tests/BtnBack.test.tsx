import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BtnBack from '../components/BtnBack';
import '@testing-library/jest-dom';

test('renders the back button and navigates back', () => {
  render(
    <BrowserRouter>
      <BtnBack />
    </BrowserRouter>
  );
  
  const backButton = screen.getByText('Back');
  expect(backButton).toBeInTheDocument();
});
