import merge from "lodash/object/merge";

/**
 * Merge options.
 */

export default function (dest, src) {
  if (!dest || !src) return;

  return merge(dest, src, function (a, b) {
    if (b && Array.isArray(a)) {
      var c = a.slice(0);
      for (var v of b) {
        if (a.indexOf(v) < 0) {
          c.push(v);
        }
      }
      return c;
    }
  });
}
