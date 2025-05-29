/* @minVersion 7.27.0 */
/* @mangleFns */
/* @internal */

// Also used to define Iterator Methods
// Defining the .next, .throw, and .return methods of the Iterator interface in terms of a single ._invoke method.
export default function regeneratorDefine(
  obj: any,
  key?: PropertyKey,
  value?: unknown,
  noFlags?: true,
) {
  var define: typeof Object.defineProperty | 0 = Object.defineProperty;
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "", {});
  } catch (_) {
    define = 0;
  }

  // @ts-expect-error explicit function reassign
  regeneratorDefine = function (
    obj: any,
    key?: PropertyKey,
    value?: unknown,
    noFlags?: true,
  ) {
    if (!key) {
      function defineIteratorMethod(method: string, i: number) {
        regeneratorDefine(obj, method, function (this: any, arg: any) {
          return this._invoke(method, i, arg);
        });
      }
      defineIteratorMethod("next", 0);
      defineIteratorMethod("throw", 1);
      defineIteratorMethod("return", 2);
    } else {
      if (define) {
        define(obj, key, {
          value: value,
          enumerable: !noFlags,
          configurable: !noFlags,
          writable: !noFlags,
        });
      } else {
        obj[key] = value;
      }
    }
  };
  regeneratorDefine(obj, key, value, noFlags);
}
