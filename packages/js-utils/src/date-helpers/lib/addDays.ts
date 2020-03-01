/**
 * Adds given amount of days to given date
 * @param {Date} date
 * @param {number} daysToAdd
 * @param {boolean} [zeroHours] - set time to 0:00:00
 * @returns {Date}
 * @example
 * const today = new Date();
 * const tomorrow = addDays(today, 2);
 */
export const addDays = (date: Date, daysToAdd: number, zeroHours = false): Date => {
  if (zeroHours === true) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysToAdd, 0, 0, 0, 0);
  }

  const newDate = new Date(date);
  newDate.setDate(date.getDate() + daysToAdd);
  return newDate
};
