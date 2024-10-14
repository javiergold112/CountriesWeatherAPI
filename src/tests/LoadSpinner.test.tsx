import { render, screen } from '@testing-library/react';
import LoadSpinner from '../components/LoadSpinner';
import '@testing-library/jest-dom';

describe('LoadSpinner Component', () => {
  it('renders loading spinner correctly', () => {
    render(<LoadSpinner />);
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });
});
