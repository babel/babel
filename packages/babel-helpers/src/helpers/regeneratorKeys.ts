/* @minVersion 7.27.0 */

export default function _regeneratorKeys(val: unknown) {
  var object = Object(val);
  var keys: string[] = [];
  var key: string;
  // eslint-disable-next-line guard-for-in
  for (var key in object) {
    keys.unshift(key);
  }

  // Rather than returning an object with a next method, we keep
  // things simple and return the next function itself.
  return function next() {
    while (keys.length) {
      key = keys.pop()!;
      if (key in object) {
        // @ts-expect-error assign to () => ...
        next.value = key;
        // @ts-expect-error assign to () => ...
        next.done = false;
        return next;
      }
    }

    // To avoid creating an additional object, we just hang the .value
    // and .done properties off the next function object itself. This
    // also ensures that the minifier will not anonymize the function.
    // @ts-expect-error assign to () => ...
    next.done = true;
    return next;
  };
}
