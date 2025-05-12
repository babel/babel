/* @minVersion 7.27.0 */
/* @internal */

export default function regeneratorDefine(
  obj: any,
  key: PropertyKey,
  value?: unknown,
  noFlags?: true,
) {
  // @ts-expect-error explicit function reassign
  regeneratorDefine = function (
    obj: any,
    key: PropertyKey,
    value?: unknown,
    noFlags?: true,
  ) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: !noFlags,
      configurable: !noFlags,
      writable: !noFlags,
    });
  };
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    regeneratorDefine({}, "");
  } catch (_) {
    // @ts-expect-error explicit function reassign
    regeneratorDefine = function (obj, key, value) {
      obj[key] = value;
    };
  }
  regeneratorDefine(obj, key, value, noFlags);
}
