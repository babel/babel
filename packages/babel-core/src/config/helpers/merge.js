// @flow

import mergeWith from "lodash/mergeWith";

export default function<T: {}>(dest?: T, src?: T) {
  if (!dest || !src) return;

  mergeWith(dest, src, function (a, b) {
    if (b && Array.isArray(a)) {
      const newArray = b.slice(0);

      for (const item of a) {
        if (newArray.indexOf(item) < 0) {
          newArray.push(item);
        }
      }

      return newArray;
    }
  });
}
