/* @minVersion 7.0.0-beta.0 */

type Intersection<R extends any[]> = R extends [infer H, ...infer S]
  ? H & Intersection<S>
  : unknown;

export default function _extends<T extends object, U extends unknown[]>(
  target: T,
  ...sources: U
): T & Intersection<U>;
export default function _extends() {
  // @ts-expect-error explicitly assign to function
  _extends = Object.assign
    ? // need a bind because https://github.com/babel/babel/issues/14527
      // @ts-expect-error -- intentionally omitting the argument
      Object.assign.bind(/* undefined */)
    : function (target: any) {
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
    null,
    arguments as any as [source: object, ...target: any[]],
  );
}
