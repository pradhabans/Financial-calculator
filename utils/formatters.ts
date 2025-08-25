export const formatCurrency = (value: number): string => {
  if (value === Infinity || isNaN(value)) {
    return '₹ N/A';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
