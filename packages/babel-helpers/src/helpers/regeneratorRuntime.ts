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
  type NewContext = Parameters<InnerFn>[0];

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

  function callSyncState<A1, A2, R>(
    context: Context & NewContext,
    fn: (a: A1, b: A2) => R,
    a1: A1,
    a2?: A2,
  ): R {
    context.p = context.prev!;
    context.n = context.next === "end" ? -1 : context.next!;
    try {
      return fn(a1, a2!);
    } finally {
      context.next = context.n === -1 ? "end" : context.n;
    }
  }

  function wrapInnerFn(innerFn: InnerFn): InnerFn {
    return function (context: Context & NewContext) {
      if (!context.stop) {
        // Shim the old context shape on top of the new one.
        context.stop = function () {
          return callSyncState(context, context.a, 2);
        };
        context["catch"] = function () {
          return context.v;
        };
        context.abrupt = function (type, arg) {
          return callSyncState(context, context.a, abruptMap[type], arg);
        };
        context.delegateYield = function (iterable, resultName, nextLoc) {
          context.resultName = resultName;
          return callSyncState(context, context.d, iterable, nextLoc);
        };
        context.finish = function (finallyLoc) {
          return callSyncState(context, context.f, finallyLoc);
        };
      }
      if (context.resultName) {
        context[context.resultName] = context.v;
        context.resultName = undefined;
      }
      context.sent = context.v;
      context.next = context.n === -1 ? "end" : context.n;
      try {
        return innerFn.call(this, context);
      } finally {
        context.p = context.prev!;
        context.n = context.next === "end" ? -1 : context.next;
      }
    } as (this: unknown, context: NewContext) => unknown;
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
