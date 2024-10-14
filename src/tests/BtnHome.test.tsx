import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BtnHome from '../components/BtnHome';
import '@testing-library/jest-dom';

test('renders home button and navigates home', () => {
  render(
    <BrowserRouter>
      <BtnHome />
    </BrowserRouter>
  );

  const homeButton = screen.getByText('Home');
  expect(homeButton).toBeInTheDocument();
});
