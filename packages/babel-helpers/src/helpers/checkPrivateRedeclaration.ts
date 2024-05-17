/* @minVersion 7.14.1 */

export default function _checkPrivateRedeclaration(
  obj: object,
  privateCollection: WeakMap<object, unknown> | WeakSet<object>,
) {
  if (privateCollection.has(obj)) {
    throw new TypeError(
      "Cannot initialize the same private elements twice on an object",
    );
  }
}
