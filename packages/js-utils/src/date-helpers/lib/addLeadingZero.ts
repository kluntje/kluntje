/**
 * Optionally Adds leading Zero to Numbers < 10
 * @param {number} inNumber
 * @returns {string}
 */
export const addLeadingZero = (inNumber: number): string => {
  return `${inNumber < 10 ? "0" : ""}${inNumber.toString()}`;
};
