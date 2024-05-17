/* @minVersion 7.0.0-beta.0 */

declare global {
  interface Object {
    __proto__: object;
  }
}

export default function _getPrototypeOf(o: object) {
  // @ts-expect-error explicitly assign to function
  _getPrototypeOf = Object.setPrototypeOf
    ? // @ts-expect-error -- intentionally omitting the argument
      Object.getPrototypeOf.bind(/* undefined */)
    : function _getPrototypeOf<T extends Object>(o: T) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}
