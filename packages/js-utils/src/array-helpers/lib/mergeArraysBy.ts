/**
 * merge two given arrays by the given checker function
 * @param {Array<T>} array1
 * @param {Array<T>} array2
 * @param {Function} checker - if this function returns true for a specific element combination the elements are getting merged
 * @returns {Array<T>}
 * @example
 * const defaultUsers = [
 *   {
 *     name: "Admin",
 *     mail: "admin@company.com"
 *   },
 *   {
 *     name: "CI",
 *     mail: "ci@company.com"
 *   }
 * ];
 * 
 * const projectUsers = [
 *   {
 *     name: "Admin",
 *     mail: "admin@company.com"
 *   },
 *   {
 *     name: "User1",
 *     mail: "user-one@company.com"
 *   },
 *   {
 *     name: "User2",
 *     mail: "user-two@company.com"
 *   }
 * ];
 * 
 * const userList = mergeArraysBy(defaultUsers, projectUsers, (defaultUser, array) => {
 *   return !array.some((projectUser) => projectUser.mail === defaultUser.mail)
 * })
 * 
 * // userList
 * // [
 * //   {
 * //     "name": "CI",
 * //     "mail": "ci@company.com"
 * //   },
 * //   {
 * //     "name": "Admin",
 * //     "mail": "admin@company.com"
 * //   },
 * //   {
 * //     "name": "User1",
 * //     "mail": "user-one@company.com"
 * //   },
 * //   {
 * //     "name": "User2",
 * //     "mail": "user-two@company.com"
 * //   }
 * // ] 
 */
export const mergeArraysBy = <T>(
  array1: Array<T>,
  array2: Array<T>,
  checker: (a: T, b: Array<T>) => boolean
): Array<T> => {
  return array1.filter(element => checker(element, array2)).concat(array2);
};
