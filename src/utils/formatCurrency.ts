export const formatCurrency = (number: number): string =>
  number.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
