
/**
 * returns a random String to be used as ID
 * @returns {string}
 */
export const getUniqueID = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
