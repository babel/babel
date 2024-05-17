/* @minVersion 7.0.0-beta.0 */

type Object = {
  __proto__?: any;
} & { [key: string]: unknown };

export default function _setPrototypeOf(o: Object, p: object | null) {
  var _setPrototypeOfImpl = Object.setPrototypeOf
    ? // @ts-expect-error - intentionally omitted argument
      Object.setPrototypeOf.bind(/* undefined */)
    : function _setPrototypeOf(o: Object, p: object | null) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOfImpl(o, p);
}
