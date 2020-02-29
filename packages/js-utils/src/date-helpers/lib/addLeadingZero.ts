/**
 * Optionally Adds leading Zero to Numbers < 10
 * @param {number} inNumber
 * @returns {string}
 * @example
 * const today = new Date();
 * const formattedDateSting = `${addLeadingZero(today.getDate())}.${addLeadingZero(today.getMonth() + 1)}.${today.getFullYear()}`;
 */
export const addLeadingZero = (inNumber: number): string => {
  return `${inNumber < 10 ? "0" : ""}${inNumber.toString()}`;
};
