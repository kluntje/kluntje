/**
 * Checks whether given dates are equal
 * @param {Date} dateA
 * @param {Date} dateB
 * @returns {boolean}
 * @example
 * const dateA = new Date(2020, 1, 29, 22, 30);
 * const dateB = new Date(2020, 1, 29, 18, 20);
 * isEqualDate(dateA. dateB); // true
 */
export const isEqualDate = (dateA: Date, dateB: Date): boolean => {
  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
};
