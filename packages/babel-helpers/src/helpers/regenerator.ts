/* @minVersion 7.27.0 */
/* @mangleFns */

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import define from "./regeneratorDefine.ts";
import defineIteratorMethods from "./regeneratorDefineIM.ts";
import values from "./regeneratorValues.ts";

const enum CompletionType {
  Normal,
  Throw,
  Break,
  Continue,
  Return,
}

type Completion = {
  type: CompletionType;
  arg?: any;
};

const enum ContextNext {
  End = -1,
}

const enum ContextMethod {
  Next,
  Throw,
  Return,
}

type TryLocs = [
  tryLoc: number,
  catchLoc?: number,
  finallyLoc?: number,
  afterLoc?: number,
];

type TryEntry = [...TryLocs, completion?: Completion];

type Context = {
  prev: number;
  next: number;
  sent: any;

  stop?(): any;
  dispatchException?(exception: any): boolean | undefined;
  abrupt?(type: CompletionType, arg: any): any;
  complete?(record: Completion, afterLoc?: number): any;
  finish?(finallyLoc: number): any;
  catch?(tryLoc: number): any;
  delegateYield?(iterable: any, nextLoc: number): any;
};

const enum GenState {
  SuspendedStart = 1,
  SuspendedYield = 2,
  Executing = 3,
  Completed = 4,
}

export default function /* @no-mangle */ _regenerator() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined: undefined; // More compressible than void 0.
  var $Symbol =
    typeof Symbol === "function" ? Symbol : ({} as SymbolConstructor);
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var ContextMethodStrings = ["next", "throw", "return"] as const;
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
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction",
  );

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
      _method: ContextMethod | "next" | "throw" | "return",
      _arg: any,
    ) {
      _method = ContextMethodStrings.indexOf(
        _method as "next" | "throw" | "return",
      ) as ContextMethod;

      if (state === GenState.Executing) {
        throw new Error("Generator is already running");
      }

      if (state === GenState.Completed) {
        if (_method === ContextMethod.Throw) {
          throw _arg;
        }

        // Be forgiving, per GeneratorResume behavior specified since ES2015:
        // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
        // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
        return { value: undefined, done: true };
      }

      method = _method;
      arg = _arg;

      while (true) {
        if (!delegateIterator) {
          if (method === ContextMethod.Next) {
            ctx.sent = arg;
          } else if (method === ContextMethod.Throw) {
            if (state === GenState.SuspendedStart) {
              state = GenState.Completed;
              throw arg;
            }

            Context_dispatchException(arg);
          } else if (method === ContextMethod.Return) {
            Context_abrupt(CompletionType.Return, arg);
          }
        }
        try {
          if (delegateIterator) {
            // Call delegate.iterator[context.method](context.arg) and handle the result

            if ((_ = delegateIterator[ContextMethodStrings[method]])) {
              if ((_ = _.call(delegateIterator, arg))) {
                if (!_) {
                  method = ContextMethod.Throw;
                  arg = new TypeError("iterator result is not an object");
                }
                if (!_.done) {
                  // Re-yield the result returned by the delegate method.
                  return _;
                }

                // If context.method was "throw" but the delegate handled the
                // exception, let the outer generator proceed normally. If
                // context.method was "next", forget context.arg since it has been
                // "consumed" by the delegate iterator. If context.method was
                // "return", allow the original .return call to continue in the
                // outer generator.
                if (method !== ContextMethod.Return) {
                  method = ContextMethod.Next;
                  arg = _.value;
                }
              }
            } else {
              // Note: ["return"] must be used for ES3 parsing compatibility.
              if (
                method === ContextMethod.Throw &&
                (_ = delegateIterator["return"])
              ) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                _.call(delegateIterator);
              }

              if (method !== ContextMethod.Return) {
                method = ContextMethod.Throw;
                arg = new TypeError(
                  "The iterator does not provide a '" +
                    ContextMethodStrings[method] +
                    "' method",
                );
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
            state = GenState.Executing;

            _ = (ctx.next === ContextNext.End ? Context_stop : innerFn).call(
              self,
              ctx,
            );
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = done ? GenState.Completed : GenState.SuspendedYield;

            if (_ !== ContinueSentinel) {
              return {
                value: _,
                done: done,
              };
            }
          }
        } catch (e) {
          state = GenState.Completed;
          delegateIterator = undefined;
          method = ContextMethod.Throw;
          arg = e;
        }
      }
    }

    function resetTryEntry(entry: TryEntry) {
      var record = entry[4] || ({} as Completion);
      record.type = CompletionType.Normal;
      record.arg = undefined;
      entry[4] = record;
    }

    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    var tryEntries: TryEntry[] = tryLocsList || [];
    var rval: any;
    var done = false;
    var delegateIterator: Iterator<any> | undefined;
    var method = ContextMethod.Next;
    var arg: any = undefined;

    tryEntries.forEach(resetTryEntry);

    var ctx: Context = {
      prev: 0,
      next: 0,

      sent: undefined,

      stop: Context_stop,
      abrupt: Context_abrupt,
      finish: Context_finish,
      catch: Context_catch,
      delegateYield: Context_delegateYield,
    };

    function Context_stop() {
      done = true;
      return rval;
    }

    function Context_dispatchException(exception: any) {
      if (done) {
        throw exception;
      }

      function handle(loc: number) {
        record.type = CompletionType.Throw;
        record.arg = exception;
        ctx.next = loc;
      }

      for (var i = tryEntries.length - 1; i >= 0; --i) {
        var entry = tryEntries[i];
        var record = entry[4]!;
        var prev = ctx.prev;
        var catchLoc = entry[1]!;
        var finallyLoc = entry[2]!;

        if (entry[0] <= prev) {
          if (prev < catchLoc) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = ContextMethod.Next;
            arg = undefined;

            handle(catchLoc);
            return;
          } else if (prev < finallyLoc) {
            handle(finallyLoc);
            return;
          }
        }
      }
      state = GenState.Completed;
      throw exception;
    }

    function Context_abrupt(type: CompletionType, arg: any) {
      for (var i = tryEntries.length - 1; i >= 0; --i) {
        var entry = tryEntries[i];
        if (entry[0] <= ctx.prev && ctx.prev < entry[2]!) {
          var finallyEntry: TryEntry | null = entry;
          break;
        }
      }

      if (
        finallyEntry! &&
        (type === CompletionType.Break || type === CompletionType.Continue) &&
        finallyEntry[0] <= arg &&
        arg <= finallyEntry[2]!
      ) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry! ? finallyEntry[4]! : ({} as Completion);
      record.type = type;
      record.arg = arg;

      if (finallyEntry!) {
        method = ContextMethod.Next;
        ctx.next = finallyEntry[2]!;
        return ContinueSentinel;
      }

      return Context_complete(record);
    }

    function Context_complete(record: Completion, afterLoc?: number) {
      if (record.type === CompletionType.Throw) {
        throw record.arg;
      }

      if (
        record.type === CompletionType.Break ||
        record.type === CompletionType.Continue
      ) {
        ctx.next = record.arg;
      } else if (record.type === CompletionType.Return) {
        rval = arg = record.arg;
        method = ContextMethod.Return;
        ctx.next = ContextNext.End;
      } else if (record.type === CompletionType.Normal && afterLoc) {
        ctx.next = afterLoc;
      }

      return ContinueSentinel;
    }

    function Context_finish(finallyLoc: number) {
      for (var i = tryEntries.length - 1; i >= 0; --i) {
        var entry = tryEntries[i];
        if (entry[2] === finallyLoc) {
          Context_complete(entry[4]!, entry[3]);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    }

    function Context_catch(tryLoc: number) {
      for (var i = tryEntries.length - 1; i >= 0; --i) {
        var entry = tryEntries[i];
        if (entry[0] === tryLoc) {
          var record = entry[4]!;
          if (record.type === CompletionType.Throw) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
    }

    function Context_delegateYield(iterable: any, nextLoc: number) {
      delegateIterator = values(iterable);

      // Deliberately forget the last sent value so that we don't
      // accidentally pass it on to the delegate.
      arg = undefined;
      ctx.next = nextLoc;

      return ContinueSentinel;
    }

    return invoke;
  }

  // @ts-expect-error explicit function assignment
  return (_regenerator = function () {
    return { w: wrap, m: mark };
  })();
}
