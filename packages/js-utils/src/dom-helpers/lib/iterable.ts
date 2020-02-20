export function isIterable<T>(itr: any): itr is Iterable<T> {
  return Symbol.iterator in itr;
}

export function hasElements<T>(itr: Array<T>): boolean;

export function hasElements<T>(itr: Iterable<T>): boolean;

export function hasElements(itr: Iterable<any> | Array<any> | {length: number}): boolean {
  if ('length' in itr) {
    return itr.length > 0;
  }

  return !itr[Symbol.iterator]().next().done;
}