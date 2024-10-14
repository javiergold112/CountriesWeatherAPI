import { render, screen } from '@testing-library/react';
import MoonIcon from '../components/MoonIcon';
import '@testing-library/jest-dom';


describe('MoonIcon Component', () => {
    it('renders light theme icon correctly', () => {
      render(<MoonIcon theme="light" />);
  
      const svgIcon = screen.getByTestId('moon-icon');
      expect(svgIcon).toBeInTheDocument();
    });
  });
