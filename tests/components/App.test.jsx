import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../src/App';

describe('App', () => {
	it('renders App component', () => {
		render(<App />);
		const heading = screen.getByText('React App');
		expect(heading).toBeInTheDocument();
	});
});
