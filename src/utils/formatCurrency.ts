export const formatCurrency = (number: number): string =>
  (number / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
