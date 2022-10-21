import { ExpenseType } from '../globalTypes/expenseType';

export const DUMMY_DATA: ExpenseType[] = [
  {
    id: 'e1',
    description: 'The book',
    amount: 12.45,
    date: new Date('2021-01-13'),
  },
  {
    id: 'e2',
    description: 'The trick',
    amount: 23.45,
    date: new Date('2021-01-01'),
  },
  {
    id: 'e3',
    description: 'The shurt',
    amount: 2.5,
    date: new Date('2022-10-14'),
  },
  {
    id: 'e4',
    description: 'The soop',
    amount: 5.55,
    date: new Date('2022-10-14'),
  },
  {
    id: 'e5',
    description: 'The goose',
    amount: 23.5,
    date: new Date('2022-10-15'),
  },
];
