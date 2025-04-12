/* @minVersion 7.27.0 */
/* @mangleFns */

import define from "./regeneratorDefine.ts";

// Helper for defining the .next, .throw, and .return methods of the
// Iterator interface in terms of a single ._invoke method.
export default function defineIteratorMethods(prototype: any) {
  function defineIteratorMethod(method: string) {
    define(prototype, method, function (this: any, arg: any) {
      return this._invoke(method, arg);
    });
  }
  defineIteratorMethod("next");
  defineIteratorMethod("throw");
  defineIteratorMethod("return");
}
