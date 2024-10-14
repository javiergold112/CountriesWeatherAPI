import { render, screen, fireEvent } from '@testing-library/react';
import InputSearch from '../components/InputSearch';
import '@testing-library/jest-dom';

test('allows input and calls handleQuery function', () => {
  const handleQueryMock = jest.fn();
  render(<InputSearch query="" handleQuery={handleQueryMock} />);

  const input = screen.getByPlaceholderText('Search for a country...');
  fireEvent.change(input, { target: { value: 'France' } });

  expect(handleQueryMock).toHaveBeenCalled();
  expect(handleQueryMock).toHaveBeenCalledWith(expect.any(Object));
});
