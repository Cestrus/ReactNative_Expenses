import { toDateFormat } from './date';

export const checkValid = (inputId: string, value: string): boolean => {
  switch (inputId) {
    case 'amount': {
      return !isNaN(+value) && +value > 0;
    }
    case 'description': {
      return value.trim().length > 0;
      break;
    }
    case 'date': {
      return value.length === 10 && typeof toDateFormat(value) !== 'string';
    }
    default:
      break;
  }
};
