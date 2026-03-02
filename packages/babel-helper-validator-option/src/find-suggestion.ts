const { min } = Math;

// a minimal leven distance implementation
// balanced maintainability with code size
// It is not blazingly fast but should be okay for Babel user case
// where it will be run for at most tens of time on strings
// that have less than 20 ASCII characters

// https://rosettacode.org/wiki/Levenshtein_distance#ES5
function levenshtein(a: string, b: string): number {
  let t = [],
    u: number[] = [],
    i,
    j;
  const m = a.length,
    n = b.length;
  if (!m) {
    return n;
  }
  if (!n) {
    return m;
  }
  for (j = 0; j <= n; j++) {
    t[j] = j;
  }
  for (i = 1; i <= m; i++) {
    for (u = [i], j = 1; j <= n; j++) {
      u[j] =
        a[i - 1] === b[j - 1] ? t[j - 1] : min(t[j - 1], t[j], u[j - 1]) + 1;
    }
    t = u;
  }
  return u[n];
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
export function findSuggestion(str: string, arr: readonly string[]): string {
  const distances = arr.map<number>(el => levenshtein(el, str));
  return arr[distances.indexOf(min(...distances))];
}
