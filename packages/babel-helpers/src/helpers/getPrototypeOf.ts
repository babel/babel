/* @minVersion 7.0.0-beta.0 */

type Object = {
  __proto__?: any;
} & { [key: string]: unknown };

export default function _getPrototypeOf<T extends Object>(o: T) {
  // @ts-expect-error explicitly assign to function
  _getPrototypeOf = Object.setPrototypeOf
    ? // @ts-expect-error -- intentionally omitting the argument
      Object.getPrototypeOf.bind(/* undefined */)
    : function _getPrototypeOf<T extends Object>(o: T) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}
