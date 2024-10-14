import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CardCountries from '../pages/CardCountries';
import { useCountries } from '../hooks/useCountries';
import '@testing-library/jest-dom';

jest.mock('../hooks/useCountries');

jest.mock('../components/InputSearch', () => ({
  __esModule: true,
  default: ({ query, handleQuery }: any) => (
    <input
      data-testid="input-search"
      value={query}
      onChange={handleQuery}
      placeholder="Search..."
    />
  ),
}));

jest.mock('../components/FilterBy', () => ({
  __esModule: true,
  default: ({ handleFilterBy }: any) => (
    <select data-testid="filter-by" onChange={handleFilterBy}>
      <option value="all">All</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
    </select>
  ),
}));

jest.mock('../components/SingleCard', () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div data-testid="single-card">
      {data.countries.edges.map((edge: any) => (
        <div key={edge.node.code}>{edge.node.name}</div>
      ))}
    </div>
  ),
}));

jest.mock('../components/LoadSpinner', () => ({
  __esModule: true,
  default: () => <div data-testid="load-spinner">Loading...</div>,
}));

jest.mock('../components/ErrorMessage', () => ({
  __esModule: true,
  default: () => <div data-testid="error-message">Error occurred</div>,
}));

describe('CardCountries Component', () => {
  const mockUseCountries = useCountries as jest.Mock;

  const mockData = {
    countries: {
      edges: [
        { node: { code: 'US', name: 'United States', population: 331000000, area: 9833520 } },
        { node: { code: 'CA', name: 'Canada', population: 37700000, area: 9984670 } },
      ],
    },
  };

  const mockDataForAsia = {
    countries: {
      edges: [
        { node: { code: 'CN', name: 'China', population: 1400000000, area: 9596961 } },
        { node: { code: 'IN', name: 'India', population: 1360000000, area: 3287263 } },
      ],
    },
  };

  beforeEach(() => {
    mockUseCountries.mockImplementation((name, region) => {
      if (region === 'asia') {
        return {
          data: mockDataForAsia,
          loading: false,
          error: null,
        };
      }
      return {
        data: mockData,
        loading: false,
        error: null,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders search, filter, and sort controls', () => {
    render(<CardCountries />);
    
    expect(screen.getByTestId('input-search')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by')).toBeInTheDocument();
    expect(screen.getByLabelText('sort-by')).toBeInTheDocument();
  });

  test('displays loading spinner when loading', () => {
    mockUseCountries.mockReturnValueOnce({
      data: null,
      loading: true,
      error: null,
    });

    render(<CardCountries />);

    expect(screen.getByTestId('load-spinner')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    mockUseCountries.mockReturnValueOnce({
      data: null,
      loading: false,
      error: 'Failed to fetch',
    });

    render(<CardCountries />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  test('renders country cards when data is available', () => {
    render(<CardCountries />);

    expect(screen.getByTestId('single-card')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  test('filters countries based on search query', async () => {
    render(<CardCountries />);

    const searchInput = screen.getByTestId('input-search');
    fireEvent.change(searchInput, { target: { value: 'Canada' } });

    await waitFor(() => {
      expect(mockUseCountries).toHaveBeenCalledWith('Canada', undefined);
    });
  });

  test('filters countries based on region', async () => {
    render(<CardCountries />);

    const filterSelect = screen.getByTestId('filter-by');
    fireEvent.change(filterSelect, { target: { value: 'asia' } }); // Corrected value

    await waitFor(() => {
      expect(mockUseCountries).toHaveBeenLastCalledWith(undefined, 'asia');
    });
  });

  test('sorts countries by population', () => {
    render(<CardCountries />);

    const sortSelect = screen.getByLabelText('sort-by');
    fireEvent.change(sortSelect, { target: { value: 'population' } });

    const countryNames = screen.getAllByText(/United States|Canada/).map(el => el.textContent);
    expect(countryNames).toEqual(['United States', 'Canada']);
  });

  test('prevents non-alphabetic characters in search', () => {
    render(<CardCountries />);

    const searchInput = screen.getByTestId('input-search');
    fireEvent.change(searchInput, { target: { value: '1234' } });

    expect(searchInput).toHaveValue('');
  });
});
