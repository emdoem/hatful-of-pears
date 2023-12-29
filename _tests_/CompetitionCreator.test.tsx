import CompetitionCreator from '@/components/CompetitionCreator';

import { getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

it('displays "Create Competition" as a title', () => {
    const { getByText } = render(<CompetitionCreator />);

    expect(getByText('Create Competition')).toBeInTheDocument();
});

it('does not allow to move forward if competition type is not chosen', () => { 
    render(<CompetitionCreator />);

    const title = screen.getByText('Create Competition');
    const createButton = screen.getByText('Create');

    const typeInput = screen.getByRole('combobox');
    userEvent.click(typeInput);

    userEvent.click(createButton);    

    expect(title).toBeInTheDocument();
}); // this gives a false positive

it('goes to next step if competition type is chosen and "Create" is clicked', async () => { 
    render(<CompetitionCreator />);

    const title = screen.getByText('Create Competition');

    const typeInput = screen.getByRole('combobox');
    userEvent.click(typeInput);

    const fixedOption = await screen.findByText('Fixed couples');
    userEvent.click(fixedOption);

    const createButton = screen.getByText('Create');
    userEvent.click(createButton);

    expect(title).not.toBeInTheDocument();
});
