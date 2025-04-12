/* @minVersion 7.18.0 */
/* @mangleFns */

import OverloadYield from "./OverloadYield.ts";
import regenerator from "./regenerator.ts";
import async from "./regeneratorAsync.ts";
import asyncGen from "./regeneratorAsyncGen.ts";
import AsyncIterator from "./regeneratorAsyncIterator.ts";
import keys from "./regeneratorKeys.ts";
import values from "./regeneratorValues.ts";

export default function /* @no-mangle */ _regeneratorRuntime() {
  "use strict";

  var r = regenerator();

  var gen = r.m(_regeneratorRuntime);
  var GeneratorFunctionPrototype = Object.getPrototypeOf
    ? Object.getPrototypeOf(gen)
    : (gen as any).__proto__;
  var GeneratorFunction = GeneratorFunctionPrototype.constructor;

  function isGeneratorFunction(genFun: any) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  }

  // @ts-expect-error explicit function assignment
  return (_regeneratorRuntime = function () {
    return {
      wrap: r.w,
      isGeneratorFunction: isGeneratorFunction,
      mark: r.m,
      awrap: OverloadYield,
      AsyncIterator: AsyncIterator,
      async: function (
        innerFn: Function,
        outerFn: Function,
        self: any,
        tryLocsList: any[],
        PromiseImpl?: PromiseConstructor,
      ) {
        return (isGeneratorFunction(outerFn) ? asyncGen : async)(
          innerFn,
          outerFn,
          self,
          tryLocsList,
          PromiseImpl,
        );
      },
      keys: keys,
      values: values,
    };
  })();
}
