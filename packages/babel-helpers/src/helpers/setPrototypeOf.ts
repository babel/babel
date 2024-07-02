/* @minVersion 7.0.0-beta.0 */

export default function _setPrototypeOf(o: object, p: object) {
  // @ts-expect-error - assigning to function
  _setPrototypeOf = Object.setPrototypeOf
    ? // @ts-expect-error - intentionally omitted argument
      Object.setPrototypeOf.bind(/* undefined */)
    : function _setPrototypeOf(o: object, p: object) {
        (o as any).__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
}
