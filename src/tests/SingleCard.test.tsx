import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SingleCard from '../components/SingleCard';
import '@testing-library/jest-dom';

const mockData = {
    countries: {
        edges: [
            {
                node: {
                    id: '1',
                    name: 'Italy',
                    flag: 'italy-flag-url',
                    population: 60000000,
                    region: 'Europe',
                    alpha3Code: 'ITA',
                    capital: 'Rome',
                },
            },
            {
                node: {
                    id: '2',
                    name: 'Germany',
                    flag: 'germany-flag-url',
                    population: 83000000,
                    region: 'Europe',
                    alpha3Code: 'DEU',
                    capital: 'Berlin',
                },
            },
        ],
    },
};

test('renders country cards with correct data', () => {
    render(
        <BrowserRouter>
            <SingleCard data={mockData} />
        </BrowserRouter>
    );

    mockData.countries.edges.forEach(({ node }) => {
        const countryCard = screen.getByText(node.name).closest('div');
        expect(countryCard).toBeInTheDocument();

        expect(screen.getByAltText(`${node.name} Flag`)).toHaveAttribute('src', node.flag);

        expect(within(countryCard as HTMLElement).getByText(node.population.toLocaleString())).toBeInTheDocument();

        const regionElement = within(countryCard as HTMLElement).getByText('Region:', { selector: 'strong' });
        const regionLi = regionElement.closest('li');
        expect(within(regionLi as HTMLElement).getByText(node.region)).toBeInTheDocument();

        expect(within(countryCard as HTMLElement).getByText(node.capital)).toBeInTheDocument();
    });

    mockData.countries.edges.forEach(({ node }) => {
        const linkElement = screen.getAllByRole('link', { name: node.name });
        expect(linkElement[0]).toHaveAttribute('href', `/${node.id}`);
    });
});
