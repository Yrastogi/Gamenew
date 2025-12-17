import { Level } from '../types/index';
import { isPrime, getRowCol } from './helpers';

export const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Even Indices',
    description: 'Flash squares where index % 2 === 0',
    rule: (index) => index % 2 === 0,
  },
  {
    id: 2,
    name: 'Diagonals',
    description: 'Flash squares on main and anti-diagonals',
    rule: (index) => {
      const { row, col } = getRowCol(index);
      return row === col || row + col === 4;
    },
  },
  {
    id: 3,
    name: 'Prime Numbers',
    description: 'Flash squares whose index is a prime number',
    rule: (index) => isPrime(index),
  },
  {
    id: 4,
    name: 'Center Cluster',
    description: 'Flash center and its 4 direct neighbors',
    rule: (index) => [7, 11, 12, 13, 17].includes(index),
  },
  {
    id: 5,
    name: 'Modulo Pattern',
    description: 'Flash squares where (row + col) % 3 === 0',
    rule: (index) => {
      const { row, col } = getRowCol(index);
      return (row + col) % 3 === 0;
    },
  },
  {
    id: 6,
    name: 'Corner Plus',
    description: 'Flash corners and plus sign in center',
    rule: (index) => [0, 4, 7, 11, 12, 13, 17, 20, 24].includes(index),
  },
];