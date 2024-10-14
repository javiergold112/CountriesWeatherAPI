import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  const toggleThemeMock = jest.fn();

  it('renders Header correctly', () => {
    render(<Header theme="light" toggleTheme={toggleThemeMock} />);
    const headerText = screen.getByText(/Where in the world?/i);
    const darkModeButton = screen.getByText(/Dark mode/i);
    expect(headerText).toBeInTheDocument();
    expect(darkModeButton).toBeInTheDocument();
  });

  it('calls toggleTheme when Dark mode button is clicked', () => {
    render(<Header theme="light" toggleTheme={toggleThemeMock} />);
    const darkModeButton = screen.getByText(/Dark mode/i);
    fireEvent.click(darkModeButton);
    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
