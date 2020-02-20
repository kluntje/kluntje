
export type MQDefinition = {
  name: string;
  query: string;
  minWidth?: number;
  maxWidth?: number;
  colCount?: number;
}

/**
 * returns current mediaQuery name. e.g. "MQ2"
 * @returns {mediaQuery} - mq name
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
