
export type MQDefinition = {
  name: string;
  query: string;
  minWidth?: number;
  maxWidth?: number;
  colCount?: number;
}

/**
 * returns current mediaQuery-name. e.g. "MQ2"
 * @param {Array<MQDefinition>} mediaQueries
 * @returns {string} - mediaQuery name e.g. MQ1
 * @example
 * const myMqs = [
 *   {
 *     name: 'MQ2',
 *     query: '(min-width: 769px)'
 *   },
 *   {
 *     name: 'MQ1',
 *     query: '(min-width: 0px)'
 *   }
 * ];
 * 
 * const curMQ = getCurrentMQ(myMqs);
 */
export const getCurrentMQ = (mediaQueries: Array<MQDefinition>): string => {
  let mediaQuery: string = '';
  mediaQueries.forEach(mq => {
    if (!mediaQuery.length && window.matchMedia(mq.query).matches) {
      mediaQuery = mq.name;
    }
  });
  return mediaQuery;
};
