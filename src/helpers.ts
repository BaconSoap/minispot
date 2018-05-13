export type Action<T> = {
  type: string;
  payload: T;
};

export type ActionWithoutPayload = {
  type: string;
};

export type IdMap<T> = { [id: string]: T };
export type ReducerMap<TState> = { [actionId: string]: (state: TState, action: Action<any>) => TState };
export type Dispatch<TActionType> = (action: Action<TActionType>) => void;

/**
 * Returns a new array with all matching elements replaced with a new value. If the provided matcher
 * does not find a match, no values will be replaced. All values that match the matcher be replaced.
 * @param arr the array to search for values to replace
 * @param finder predicate to determine if a given element is a match or not
 * @param newVal value to replace all matches with
 */
export function replaceBy<T>(arr: T[], finder: (item: T) => boolean, newVal: T) {
  return arr.map(val => {
    return finder(val) ? newVal : val;
  });
}

/**
 * Converts an array of homogenous objects into an IdMap of key => object
 * @param array the array to convert
 * @param key property to use as the key. Must be unique across the array of elements, or items will be dropped
 */
export function arrayToObject<T>(array: T[], key: keyof T): IdMap<T> {
  return array.reduce((sum, cur) => ({ ...sum, [cur[key as string]]: cur }), {});
}

/**
 * Converts an IdMap of key => object into an array of objects
 * @param obj the IdMap to flatten into an array
 */
export function objectToArray<T>(obj: IdMap<T>): T[] {
  return Object.keys(obj).map(key => obj[key]);
}

