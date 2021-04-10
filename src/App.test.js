import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders with header', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Facture')
  });

  it('renders with invoice table', () => {
    render(<App />);
    const invoiceTableElement = screen.getByText(/Service/i);
    expect(invoiceTableElement).toBeInTheDocument();
  });
});
