import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders with header', () => {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent("Facturation");
  });

  it('renders with invoice table', () => {
    render(<App />);
    const invoiceTableElement = screen.getByText(/Sélectionner une facture/i);
    expect(invoiceTableElement).toBeInTheDocument();
  });
});
