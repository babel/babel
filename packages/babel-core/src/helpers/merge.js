/* @flow */

import merge from "lodash/object/merge";

export default function (dest?: Object, src?: Object): ?Object {
  if (!dest || !src) return;

  return merge(dest, src, function (a, b) {
    if (b && Array.isArray(a)) {
      let c = a.slice(0);
      for (let v of b) {
        if (a.indexOf(v) < 0) {
          c.push(v);
        }
      }
      return c;
    }
  });
}
