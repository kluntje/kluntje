/**
 * Checks whether given dates are equal
 * @param {Date} dateA
 * @param {Date} dateB
 * @returns {boolean}
 */
export const isEqualDate = (dateA: Date, dateB: Date): boolean => {
  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
};
