import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterBy from '../components/FilterBy';

test('renders FilterBy with correct options', () => {
  const mockHandleFilterBy = jest.fn();

  render(<FilterBy handleFilterBy={mockHandleFilterBy} />);

  const selectElement = screen.getByLabelText('filter-by');
  expect(selectElement).toBeInTheDocument();

  expect(screen.getByText('Filter by Region')).toBeInTheDocument();

  expect(screen.getByText('All Region')).toBeInTheDocument();

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  regions.forEach((region) => {
    expect(screen.getByText(region)).toBeInTheDocument();
  });
});

test('calls handleFilterBy when a region is selected', () => {
  const mockHandleFilterBy = jest.fn();

  render(<FilterBy handleFilterBy={mockHandleFilterBy} />);

  const selectElement = screen.getByLabelText('filter-by');
  fireEvent.change(selectElement, { target: { value: 'Asia' } });

  expect(mockHandleFilterBy).toHaveBeenCalledTimes(1);
  expect(mockHandleFilterBy).toHaveBeenCalledWith(expect.objectContaining({
    target: expect.objectContaining({ value: 'Asia' }),
  }));
});
