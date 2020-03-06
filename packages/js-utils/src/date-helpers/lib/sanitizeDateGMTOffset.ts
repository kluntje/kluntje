/**
 * Helper to make date parsing cross browser compatible
 * Some browsers (e.g. Safari) need the GMT offset part to be in format "+00:00"
 * This helper makes sure that any present GMT offset follows that format and can safely be parsed:
 * Date.parse("2020-01-01T12:13:14.000+0200") // throws error in Safari
 * Date.parse("2020-01-01T12:13:14.000+02:00") // succes
 *
 * @param {string} date - date string to be sanitized for parsing
 * @returns {string} correctly formatted date
 * @example
 * sanitizeDateGMTOffset("2020-01-01T12:13:14.000+0200") // "2020-01-01T12:13:14.000+02:00"
 */

export const sanitizeDateGMTOffset = (date: string): string => {
  // split date into parts, specifically extract the time part
  let dateParts = date.split('T');
  // get last part of date string which should contain GMT offset
  let timeSeg = dateParts[dateParts.length - 1];
  // find marker for GMT offset, either "+" or "-"
  const marker = timeSeg.match(/(\+|\-)/g);
  if (marker === null) return date;
  // we found a marker
  // get the offset value by spliting it from the time segment
  let gmtOffsetValue = timeSeg.split(marker[0]);
  // split the offset value in pairs of two digits
  const gmtArr = gmtOffsetValue[1].match(/\d{2}/g);
  if (gmtArr === null) return date;
  // we found an offset
  // replace offset value with new string containing a colon
  gmtOffsetValue[1] = gmtArr.join(':');
  // replace value of last segment with intact marker
  timeSeg = gmtOffsetValue.join(marker[0]);
  // replace part in date array
  dateParts[dateParts.length - 1] = timeSeg;
  // rejoin date
  date = dateParts.join('T');

  return date;
};
