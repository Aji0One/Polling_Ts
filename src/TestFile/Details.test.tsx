import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter and Route
import Details from '../Pages/Details';

describe('Details', () => {
    test('displays loading text while fetching data', () => {
        render(<MemoryRouter><Details /></MemoryRouter>);

        expect(screen.getByText('Loading ...')).toBeInTheDocument();

    });


});
