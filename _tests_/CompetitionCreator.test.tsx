import CompetitionCreator from '@/components/CompetitionCreator';

import {getByText, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, xdescribe, expect, it, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

describe('Competition Creator', () => {
    it('displays "Create Competition" as a title', () => {
        const {getByText} = render(<CompetitionCreator />);

        expect(getByText('Competition Creator')).toBeInTheDocument();
    });
    it('does not allow to move forward if competition type is not chosen', () => {});
    it('goes to next step if competition type is chosen and "Create" is clicked', () => {});
})