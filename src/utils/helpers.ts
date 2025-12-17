// Utility function to check if a number is prime
export const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Get row and column from index
export const getRowCol = (index: number): { row: number; col: number } => {
  return {
    row: Math.floor(index / 5),
    col: index % 5,
  };
};