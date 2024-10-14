import { render, screen } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';
import '@testing-library/jest-dom';

test('renders error message', () => {
  render(<ErrorMessage />);

  expect(screen.getByText('Ops! Something wrong')).toBeInTheDocument();
  expect(screen.getByText(/try again later/)).toBeInTheDocument();
});
