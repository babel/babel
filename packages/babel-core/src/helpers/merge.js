import mergeWith from "lodash/mergeWith";

export default function (dest?: Object, src?: Object): ?Object {
  if (!dest || !src) return;

  return mergeWith(dest, src, function (a, b) {
    if (b && Array.isArray(a)) {
      let newArray = b.slice(0);

      for (let item of (a: Array)) {
        if (newArray.indexOf(item) < 0) {
          newArray.push(item);
        }
      }

      return newArray;
    }
  });
}
