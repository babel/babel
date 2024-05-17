/* @minVersion 7.0.0-beta.0 */

export default function _extends<T extends {}, U>(
  this: any,
  target: T,
  source: U,
): T & U;
export default function _extends<T extends {}, U, V>(
  this: any,
  target: T,
  source1: U,
  source2: V,
): T & U & V;
export default function _extends<T extends {}, U, V, W>(
  this: any,
  target: T,
  source1: U,
  source2: V,
  source3: W,
): T & U & V & W;
export default function _extends(
  this: any,
  target: object,
  ...sources: any[]
): any;
export default function _extends(this: any) {
  // @ts-expect-error explicitly assign to function
  _extends = Object.assign
    ? // need a bind because https://github.com/babel/babel/issues/14527
      // @ts-expect-error -- intentionally omitting the argument
      Object.assign.bind(/* undefined */)
    : function (this: any, target: any) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

  return _extends.apply(
    this,
    arguments as any as [source: object, ...target: any[]],
  );
}
