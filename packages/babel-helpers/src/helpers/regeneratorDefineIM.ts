/* @minVersion 7.27.0 */
/* @mangleFns */
/* @internal */

import define from "./regeneratorDefine.ts";

// Helper for defining the .next, .throw, and .return methods of the
// Iterator interface in terms of a single ._invoke method.
export default function defineIteratorMethods(prototype: any) {
  function defineIteratorMethod(method: string, i: number) {
    define(prototype, method, function (this: any, arg: any) {
      return this._invoke(method, i, arg);
    });
  }
  defineIteratorMethod("next", 0);
  defineIteratorMethod("throw", 1);
  defineIteratorMethod("return", 2);
}
