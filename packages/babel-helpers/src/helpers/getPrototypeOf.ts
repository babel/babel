/* @minVersion 7.0.0-beta.0 */

export default function _getPrototypeOf(o: object): any {
  // @ts-expect-error explicitly assign to function
  _getPrototypeOf = Object.setPrototypeOf
    ? // @ts-expect-error -- intentionally omitting the argument
      Object.getPrototypeOf.bind(/* undefined */)
    : function _getPrototypeOf<T extends object>(o: T) {
        return (o as any).__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}
