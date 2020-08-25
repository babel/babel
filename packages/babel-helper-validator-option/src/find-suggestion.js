// @flow

const { min, max } = Math;

// a minimal leven distance implementation
// balanced maintenability with code size
// It is not blazingly fast but should be okay for Babel user case
// where it will be run for at most tens of time on strings
// that have less than 20 ASCII characters

// https://en.wikipedia.org/wiki/Levenshtein_distance
function leven_d(s1: string, s2: string) {
  return function leven(len1: number, len2: number): number {
    return len1 * len2
      ? min(
          leven(len1 - 1, len2),
          leven(len1, len2 - 1),
          leven(len1 - 1, len2 - 1) - ((s1[len1] === s2[len2]: any): number),
        ) + 1
      : max(len1, len2);
  };
}

/**
 * Given a string `str` and an array of candidates `arr`,
 * return the first of elements in candidates that has minimal
 * Levenshtein distance with `str`.
 * @export
 * @param {string} str
 * @param {string[]} arr
 * @returns {string}
 */
export function findSuggestion(str: string, arr: string[]): string {
  const distances = arr.map<number>(el =>
    leven_d(el, str)(el.length, str.length),
  );
  return arr[distances.indexOf(min(...distances))];
}
