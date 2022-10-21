export const getFormattedDate = (date: Date): string => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

export const toDateFormat = (string: string): Date | string => {
  const dateElements = string.split('.').map((el) => parseInt(el));
  if (dateElements.length !== 3) {
    return 'Invalid Date';
  }
  return new Date(dateElements[2], dateElements[1], dateElements[0]);
};

export const getDateMinusDays = (date: Date, days: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay() - days);
};
