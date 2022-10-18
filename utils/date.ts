export const getFormattedDate = (date: Date): string => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const getDateMinusDays = (date: Date, days: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay() - days);
};
