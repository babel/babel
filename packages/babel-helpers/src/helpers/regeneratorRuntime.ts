/* @minVersion 7.18.0 */
/* @mangleFns */

import OverloadYield from "./OverloadYield.ts";
import regenerator from "./regenerator.ts";
import async from "./regeneratorAsync.ts";
import asyncGen from "./regeneratorAsyncGen.ts";
import AsyncIterator from "./regeneratorAsyncIterator.ts";
import keys from "./regeneratorKeys.ts";
import values from "./regeneratorValues.ts";

type Context = {
  prev?: number;
  next?: number | "end";
  sent?: any;
  stop(): any;
  dispatchException(exception: any): boolean;
  abrupt(type: "throw" | "break" | "continue" | "return", arg: any): any;
  finish(finallyLoc: number): any;
  catch(tryLoc: number): any;
  delegateYield(iterable: any, resultName: `t${number}`, nextLoc: number): any;
  resultName: `t${number}` | undefined;

  [key: `t${number}`]: any;
};

export default function /* @no-mangle */ _regeneratorRuntime() {
  "use strict";

  var r = regenerator();

  type InnerFn = Parameters<typeof r.w>[0];

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

  var abruptMap = {
    throw: 1,
    return: 2,
    break: 3,
    continue: 3,
  };

  function wrapInnerFn(innerFn: InnerFn): InnerFn {
    return function (context) {
      if (!(context as unknown as Context).stop) {
        // Shim the old context shape on top of the new one.
        var oldDelegateYield = context.delegateYield;
        var oldAbrupt = context.abrupt;
        (context as unknown as Context).stop = function () {
          return oldAbrupt(2);
        };
        (context as unknown as Context)["catch"] = function () {
          return context.sent;
        };
        (context as unknown as Context).abrupt = function (type, arg) {
          return oldAbrupt(abruptMap[type], arg);
        };
        (context as unknown as Context).delegateYield = function (
          iterable,
          resultName,
          nextLoc,
        ) {
          (context as unknown as Context).resultName = resultName;
          var res = oldDelegateYield(iterable, nextLoc);
          return res;
        };
      }
      if ((context as unknown as Context).resultName) {
        (context as unknown as Context)[
          (context as unknown as Context).resultName!
        ] = context.sent;
        (context as unknown as Context).resultName = undefined;
      }
      return innerFn.call(this, context);
    };
  }

  // @ts-expect-error explicit function assignment
  return (_regeneratorRuntime = function () {
    return {
      wrap: function (innerFn: InnerFn, outerFn, self, tryLocsList) {
        return r.w(
          wrapInnerFn(innerFn),
          outerFn,
          self,
          tryLocsList && tryLocsList.reverse(),
        );
      } satisfies typeof r.w,
      isGeneratorFunction: isGeneratorFunction,
      mark: r.m,
      awrap: function (value: any, kind: any) {
        return new OverloadYield(value, kind);
      },
      AsyncIterator: AsyncIterator,
      async: function (
        innerFn: InnerFn,
        outerFn: Function,
        self: any,
        tryLocsList: any[],
        PromiseImpl?: PromiseConstructor,
      ) {
        return (isGeneratorFunction(outerFn) ? asyncGen : async)(
          wrapInnerFn(innerFn),
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
