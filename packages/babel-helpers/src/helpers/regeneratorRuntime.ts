/* @minVersion 7.18.0 */
/* @mangleFns */

import OverloadYield from "./OverloadYield.ts";
import regenerator from "./regenerator.ts";
import async from "./regeneratorAsync.ts";
import asyncGen from "./regeneratorAsyncGen.ts";
import AsyncIterator from "./regeneratorAsyncIterator.ts";
import keys from "./regeneratorKeys.ts";
import values from "./regeneratorValues.ts";

type CompatContext = {
  prev?: number;
  next?: number | "end";
  sent?: any;

  stop(): any;
  abrupt(type: "throw" | "break" | "continue" | "return", arg: any): any;
  finish(finallyLoc: number): any;
  catch(tryLoc: number): any;
  delegateYield(iterable: any, resultName: `t${number}`, nextLoc: number): any;

  resultName?: `t${number}` | undefined;

  [key: `t${number}`]: any;
};
type CompatInnerFn = (this: unknown, context: CompatContext) => unknown;

export default function /* @no-mangle */ _regeneratorRuntime() {
  "use strict";

  var r = regenerator();

  type InnerFn = Parameters<typeof r.w>[0];
  type Context = Parameters<InnerFn>[0];

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

  function wrapInnerFn(innerFn: CompatInnerFn): InnerFn {
    var compatContext: CompatContext;
    var callSyncState: <A1, A2, R>(
      fn: (a: A1, b: A2) => R,
      a1: A1,
      a2?: A2,
    ) => R;
    return function (context: Context) {
      if (!compatContext) {
        // Shim the old context shape on top of the new one.
        compatContext = {
          stop: function () {
            return callSyncState(context.a, 2);
          },
          catch: function () {
            return context.v;
          },
          abrupt: function (type, arg) {
            return callSyncState(context.a, abruptMap[type], arg);
          },
          delegateYield: function (iterable, resultName, nextLoc) {
            compatContext.resultName = resultName;
            return callSyncState(context.d, iterable, nextLoc);
          },
          finish: function (finallyLoc) {
            return callSyncState(context.f, finallyLoc);
          },
        };
        callSyncState = function (fn, a1, a2) {
          context.p = compatContext.prev!;
          context.n = compatContext.next === "end" ? -1 : compatContext.next!;
          try {
            return fn(a1, a2!);
          } finally {
            compatContext.next = context.n === -1 ? "end" : context.n;
          }
        };
      }
      if (compatContext.resultName) {
        compatContext[compatContext.resultName] = context.v;
        compatContext.resultName = undefined;
      }
      compatContext.sent = context.v;
      compatContext.next = context.n === -1 ? "end" : context.n;
      try {
        return innerFn.call(this, compatContext);
      } finally {
        context.p = compatContext.prev!;
        context.n = compatContext.next === "end" ? -1 : compatContext.next;
      }
    };
  }

  // @ts-expect-error explicit function assignment
  return (_regeneratorRuntime = function () {
    return {
      wrap: function (
        innerFn: CompatInnerFn,
        outerFn: Parameters<typeof r.w>[1],
        self: Parameters<typeof r.w>[2],
        tryLocsList: Parameters<typeof r.w>[3],
      ) {
        return r.w(
          wrapInnerFn(innerFn),
          outerFn,
          self,
          tryLocsList && tryLocsList.reverse(),
        );
      },
      isGeneratorFunction: isGeneratorFunction,
      mark: r.m,
      awrap: function (value: any, kind: any) {
        return new OverloadYield(value, kind);
      },
      AsyncIterator: AsyncIterator,
      async: function (
        innerFn: CompatInnerFn,
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
