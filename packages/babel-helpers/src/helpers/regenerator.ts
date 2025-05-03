/* @minVersion 7.27.0 */
/* @mangleFns */

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import define from "./regeneratorDefine.ts";
import defineIteratorMethods from "./regeneratorDefineIM.ts";
import values from "./regeneratorValues.ts";

const enum GenState {
  SuspendedStart,
  SuspendedYieldOrCompleted,
  Executing,
}

const enum OperatorType {
  Next,
  Throw,
  Return,
  Jump,
  Finish,
}

const enum ContextNext {
  End = -1,
}

type TryLocs = [
  tryLoc: number,
  catchLoc?: number,
  finallyLoc?: number,
  afterLoc?: number,
];

type TryEntry = [
  ...TryLocs,
  recordType?: OperatorType.Throw | OperatorType.Jump | OperatorType.Return,
  recordArg?: any,
];

type Context = {
  prev: number;
  next: number;
  sent: any;

  stop?(): any;
  dispatchException?(exception: any): boolean | undefined;
  abrupt?(type: OperatorType, arg: any): any;
  complete?(recordType: OperatorType, recordArg: any, afterLoc?: number): any;
  finish?(finallyLoc: number): any;
  catch?(tryLoc: number): any;
  delegateYield?(iterable: any, nextLoc: number): any;
};

export default function /* @no-mangle */ _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined: undefined; // More compressible than void 0.
  var $Symbol =
    typeof Symbol === "function" ? Symbol : ({} as SymbolConstructor);
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var _: any;

  function wrap(
    innerFn: Function,
    outerFn: Function,
    self: unknown,
    tryLocsList: TryLocs[],
  ) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator =
      outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    define(
      generator,
      "_invoke",
      makeInvokeMethod(innerFn, self, tryLocsList),
      true,
    );

    return generator;
  }

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  /* @no-mangle */
  function Generator() {}
  /* @no-mangle */
  function GeneratorFunction() {}
  /* @no-mangle */
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function (this: unknown) {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (
    NativeIteratorPrototype &&
    NativeIteratorPrototype !== Op &&
    hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
  ) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp =
    (GeneratorFunctionPrototype.prototype =
    Generator.prototype =
      Object.create(IteratorPrototype));
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = "GeneratorFunction";
  define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function (this: Generator) {
    return this;
  });

  define(Gp, "toString", function () {
    return "[object Generator]";
  });

  function mark(genFun: Function) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      // @ts-expect-error assign to __proto__
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  }

  function makeInvokeMethod(
    innerFn: Function,
    self: unknown,
    tryLocsList: TryLocs[],
  ) {
    var state = GenState.SuspendedStart;

    function invoke(
      _methodName: "next" | "throw" | "return",
      _method: OperatorType.Next | OperatorType.Throw | OperatorType.Return,
      _arg: any,
    ) {
      if (state > 1 /* Executing */) {
        throw TypeError("Generator is already running");
      } else if (done) {
        if (_method === OperatorType.Throw) {
          Context_dispatchExceptionOrFinishOrAbrupt(_method, _arg);
        }
      }

      method = _method;
      arg = _arg;

      while ((_ = method < 2 /* Next | Throw */ ? undefined : arg) || !done) {
        if (!delegateIterator) {
          if (!method /* Next */) {
            ctx.sent = arg;
          } else if (method < 3 /* Throw | Return */) {
            if (method > 1 /* Return */) ctx.next = ContextNext.End;
            Context_dispatchExceptionOrFinishOrAbrupt(method, arg);
          } else {
            /* Jump */
            ctx.next = arg;
          }
        }
        try {
          state = GenState.Executing;
          if (delegateIterator) {
            // Call delegate.iterator[context.method](context.arg) and handle the result

            if (!method /* Next */) _methodName = "next";
            if ((_ = delegateIterator[_methodName])) {
              if (!(_ = _.call(delegateIterator, arg))) {
                throw TypeError("iterator result is not an object");
              }
              if (!_.done) {
                // Re-yield the result returned by the delegate method.
                return _;
              }

              arg = _.value;
              // If context.method was "throw" but the delegate handled the
              // exception, let the outer generator proceed normally. If
              // context.method was "next", forget context.arg since it has been
              // "consumed" by the delegate iterator. If context.method was
              // "return", allow the original .return call to continue in the
              // outer generator.
              // method !== OperatorType.Return
              if (method < 2 /* Throw */) {
                method = OperatorType.Next;
              }
            } else {
              // Note: ["return"] must be used for ES3 parsing compatibility.
              if (
                method === OperatorType.Throw &&
                (_ = delegateIterator["return"])
              ) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                _.call(delegateIterator);
              }

              if (method < 2 /* Next | Throw */) {
                arg = TypeError(
                  "The iterator does not provide a '" +
                    _methodName +
                    "' method",
                );
                method = OperatorType.Throw;
              }
            }

            // The delegate iterator is finished, so forget it and continue with
            // the outer generator.
            // &
            // A .throw or .return when the delegate iterator has no .throw
            // method, or a missing .next method, always terminate the
            // yield* loop.
            delegateIterator = undefined;
          } else {
            if ((done = ctx.next < 0) /* End */) {
              _ = arg;
            } else {
              _ = innerFn.call(self, ctx);
            }

            if (_ !== ContinueSentinel) {
              break;
            }
          }
        } catch (e) {
          delegateIterator = undefined;
          method = OperatorType.Throw;
          arg = e;
        } finally {
          state = GenState.SuspendedYieldOrCompleted;
        }
      }
      // Be forgiving, per GeneratorResume behavior specified since ES2015:
      // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
      // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
      return {
        value: _,
        done: done,
      };
    }

    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    var tryEntries: TryEntry[] = tryLocsList || [];
    var done = false;
    var delegateIterator: Iterator<any> | undefined;
    var method: OperatorType;
    var arg: any;

    var ctx: Context = {
      prev: 0,
      next: 0,

      sent: undefined,

      abrupt: Context_dispatchExceptionOrFinishOrAbrupt,
      finish: Context_dispatchExceptionOrFinishOrAbrupt.bind(
        undefined,
        OperatorType.Finish,
      ),
      delegateYield: function (iterable: any, nextLoc: number) {
        delegateIterator = values(iterable);

        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        method = OperatorType.Next;
        arg = undefined;
        ctx.next = nextLoc;

        return ContinueSentinel;
      },
    };

    function Context_dispatchExceptionOrFinishOrAbrupt(
      _type: OperatorType,
      _arg: any,
    ) {
      method = _type;
      arg = _arg;
      for (
        _ = 0;
        !done &&
        state /* state !== SuspendedStart */ &&
        !shouldReturn &&
        _ < tryEntries.length;
        _++
      ) {
        var entry = tryEntries[_];
        var prev = ctx.prev;
        var finallyLoc = entry[2]!;
        var shouldReturn;

        if (_type > 3 /* Finish */) {
          if ((shouldReturn = finallyLoc === _arg)) {
            method = entry[4]! || OperatorType.Jump;
            arg = entry[5] === undefined ? entry[3]! : entry[5];
            entry[4] = OperatorType.Jump;
            entry[5] = undefined;
          }
        } else {
          if (entry[0] <= prev) {
            if ((shouldReturn = _type < 2 /* Throw */ && prev < entry[1]!)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = OperatorType.Next;
              ctx.sent = _arg;
              ctx.next = entry[1]!;
            } else if (prev < finallyLoc) {
              if (
                (shouldReturn =
                  // Ignore the finally entry if control is not jumping to a
                  // location outside the try/catch block.
                  _type < 3 /* Throw | Return */ ||
                  entry[0] > _arg ||
                  _arg > finallyLoc)
              ) {
                entry[4] = _type as
                  | OperatorType.Return
                  | OperatorType.Jump
                  | OperatorType.Throw;
                entry[5] = _arg;
                ctx.next = finallyLoc;
                method = OperatorType.Next;
              }
            }
          }
        }
      }
      if (shouldReturn || _type > 1 /* _type !== Throw */) {
        return ContinueSentinel;
      }
      done = true;
      throw _arg;
    }

    return invoke;
  }

  // @ts-expect-error explicit function assignment
  return (_regenerator = function () {
    return { w: wrap, m: mark };
  })();
}
