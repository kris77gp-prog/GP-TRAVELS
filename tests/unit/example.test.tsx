import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TourCard } from '@/components/ui/TourCard';

describe('TourCard Component', () => {
    it('renders correctly', () => {
        render(<TourCard tour={{ name: 'Sample Tour' }} />);
        expect(screen.getByText('Sample Tour')).toBeInTheDocument();
    });
});