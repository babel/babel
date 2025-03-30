/* @minVersion 7.18.0 */
/* @mangleFns */

/* eslint-disable @typescript-eslint/no-use-before-define */

type Completion = {
  type: "normal" | "throw" | "break" | "continue" | "return";
  arg?: any;
};

type TryLocs = [
  tryLoc: number,
  catchLoc?: number,
  finallyLoc?: number,
  afterLoc?: number,
];

type TryEntry = [...TryLocs, completion?: Completion];

type Delegate = [
  iterator: Iterator<any>,
  resultName: `t${number}`,
  nextLoc: number,
];

type Context = {
  tryEntries?: TryEntry[];
  prev?: number;
  next?: number | "end";
  sent?: any;
  _sent?: any;
  done?: boolean;
  delegate?: Delegate | null;
  method?: "next" | "throw" | "return";
  arg?: any;
  rval?: any;

  reset(skipTempReset: boolean): void;
  stop(): Context["rval"];
  dispatchException(exception: any): boolean;
  abrupt(
    type: "normal" | "throw" | "break" | "continue" | "return",
    arg: any,
  ): any;
  complete(record: Completion, afterLoc?: number): any;
  finish(finallyLoc: number): any;
  catch(tryLoc: number): any;
  delegateYield(iterable: any, resultName: `t${number}`, nextLoc: number): any;

  [key: `t${number}`]: any;
};

const enum GenState {
  SuspendedStart = 1,
  SuspendedYield = 2,
  Executing = 3,
  Completed = 4,
}

export default function /* @no-mangle */ _regeneratorRuntime() {
  ("use strict");

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  // @ts-expect-error explicit function reassign
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports: any = {};
  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined: undefined; // More compressible than void 0.
  var $Symbol =
    typeof Symbol === "function" ? Symbol : ({} as SymbolConstructor);
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj: any, key: PropertyKey, value?: unknown, noFlags?: true) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !noFlags,
      configurable: !noFlags,
      writable: !noFlags,
    });
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (_) {
    // @ts-expect-error explicit function reassign
    define = function (obj, key, value) {
      return (obj[key] = value);
    };
  }

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
    // @ts-expect-error new Context()
    var context = new Context(tryLocsList || []) as Context;

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    define(
      generator,
      "_invoke",
      makeInvokeMethod(innerFn, self, context),
      true,
    );

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn: Function, obj: unknown, arg: unknown) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
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
  define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype: any) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (this: any, arg: any) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun: any) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          ctor.name === "GeneratorFunction"
      : false;
  };

  exports.mark = function (genFun: Function) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      // @ts-expect-error assign to __proto__
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function (arg: any) {
    return { __await: arg };
  };

  /* @no-mangle */
  function AsyncIterator(
    this: any,
    generator: Generator,
    PromiseImpl: PromiseConstructor,
  ) {
    function invoke(
      method: "next" | "throw" | "return",
      arg: any,
      resolve: (value: any) => void,
      reject: (error: any) => void,
    ): any {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (
          value &&
          typeof value === "object" &&
          hasOwn.call(value, "__await")
        ) {
          return PromiseImpl.resolve(value.__await).then(
            function (value) {
              invoke("next", value, resolve, reject);
            },
            function (err) {
              invoke("throw", err, resolve, reject);
            },
          );
        }

        return PromiseImpl.resolve(value).then(
          function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          },
          function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          },
        );
      }
    }

    var previousPromise: Promise<any>;

    function enqueue(method: "next" | "throw" | "return", arg: any) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return (previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise
          ? previousPromise.then(
              callInvokeWithMethodAndArg,
              // Avoid propagating failures to Promises returned by later
              // invocations of the iterator.
              callInvokeWithMethodAndArg,
            )
          : callInvokeWithMethodAndArg());
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    define(this, "_invoke", enqueue, true);
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function (this: any) {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function (
    innerFn: Function,
    outerFn: Function,
    self: any,
    tryLocsList: TryLocs[],
    PromiseImpl: PromiseConstructor,
  ) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    // @ts-expect-error new AsyncIterator()
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl,
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result: IteratorResult<any>) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(
    innerFn: Function,
    self: unknown,
    context: Context,
  ) {
    var state = GenState.SuspendedStart;

    return function invoke(method: "next" | "throw" | "return", arg: any) {
      if (state === GenState.Executing) {
        throw new Error("Generator is already running");
      }

      if (state === GenState.Completed) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per GeneratorResume behavior specified since ES2015:
        // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
        // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
        return { value: undefined, done: true };
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenState.SuspendedStart) {
            state = GenState.Completed;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenState.Executing;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenState.Completed : GenState.SuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done,
          };
        } else if (record.type === "throw") {
          state = GenState.Completed;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate: Delegate, context: Context) {
    var methodName = context.method!;
    var method = delegate[0][methodName];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next method, always terminate the
      // yield* loop.
      context.delegate = null;

      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate[0]["return"]) {
        // If the delegate iterator has a return method, give it a
        // chance to clean up.
        context.method = "return";
        context.arg = undefined;
        maybeInvokeDelegate(delegate, context);

        // @ts-expect-error maybeInvokeDelegate may change context.method
        if (context.method === "throw") {
          // If maybeInvokeDelegate(context) changed context.method from
          // "return" to "throw", let that override the TypeError below.
          return ContinueSentinel;
        }
      }
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a '" + methodName + "' method",
        );
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate[0], context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate[1]] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate[2];

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

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

  function pushTryEntry(this: Context, locs: TryLocs) {
    this.tryEntries!.push(locs);
  }

  function resetTryEntry(entry: TryEntry) {
    var record = entry[4] || ({} as Completion);
    record.type = "normal";
    record.arg = undefined;
    entry[4] = record;
  }

  /* @no-mangle */
  function Context(this: Context, tryLocsList: TryLocs[]) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    // -1 means "root"
    this.tryEntries = [[-1]];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (val: unknown) {
    var object = Object(val);
    var keys: string[] = [];
    var key: string;
    // eslint-disable-next-line guard-for-in
    for (var key in object) {
      keys.unshift(key);
    }

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        key = keys.pop()!;
        if (key in object) {
          // @ts-expect-error assign to () => ...
          next.value = key;
          // @ts-expect-error assign to () => ...
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      // @ts-expect-error assign to () => ...
      next.done = true;
      return next;
    };
  };

  function values(iterable: any) {
    if (iterable != null) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                // @ts-expect-error assign to () => ...
                next.value = iterable[i];
                // @ts-expect-error assign to () => ...
                next.done = false;
                return next;
              }
            }

            // @ts-expect-error assign to () => ...
            next.value = undefined;
            // @ts-expect-error assign to () => ...
            next.done = true;

            return next;
          };

        // @ts-expect-error assign to () => ...
        return (next.next = next);
      }
    }

    throw new TypeError(typeof iterable + " is not iterable");
  }
  exports.values = values;

  Context.prototype = {
    constructor: Context,

    reset: function (skipTempReset) {
      this.prev = this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries!.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (
            name.charAt(0) === "t" &&
            hasOwn.call(this, name) &&
            !isNaN(+name.slice(1))
          ) {
            this[name as `t${number}`] = undefined;
          }
        }
      }
    },

    stop: function () {
      this.done = true;

      var rootEntry = this.tryEntries![0];
      var rootRecord = rootEntry[4]!;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc: number | "end") {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
      }

      for (var i = context.tryEntries!.length - 1; i >= 0; --i) {
        var entry = this.tryEntries![i];
        var record = entry[4]!;
        var prev = this.prev;
        var catchLoc = entry[1]!;
        var finallyLoc = entry[2]!;

        // -1 means "root"
        if (entry[0] === -1) {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          handle("end");
          return false;
        }

        if (!catchLoc && !finallyLoc) {
          throw new Error("try statement without catch or finally");
        }

        if (entry[0] != null && entry[0] <= prev!) {
          if (prev! < catchLoc) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            this.method = "next";
            this.arg = undefined;

            handle(catchLoc);
            return true;
          } else if (prev! < finallyLoc) {
            handle(finallyLoc);
            return false;
          }
        }
      }
    },

    abrupt: function (type, arg) {
      for (var i = this.tryEntries!.length - 1; i >= 0; --i) {
        var entry = this.tryEntries![i];
        // -1 means "root"
        if (entry[0] > -1 && entry[0] <= this.prev! && this.prev! < entry[2]!) {
          var finallyEntry: TryEntry | null = entry;
          break;
        }
      }

      if (
        finallyEntry! &&
        (type === "break" || type === "continue") &&
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
        this.method = "next";
        this.next = finallyEntry[2];
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function (finallyLoc) {
      for (var i = this.tryEntries!.length - 1; i >= 0; --i) {
        var entry = this.tryEntries![i];
        if (entry[2] === finallyLoc) {
          this.complete(entry[4]!, entry[3]);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    catch: function (tryLoc) {
      for (var i = this.tryEntries!.length - 1; i >= 0; --i) {
        var entry = this.tryEntries![i];
        if (entry[0] === tryLoc) {
          var record = entry[4]!;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = [values(iterable), resultName, nextLoc];

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    },
  } as Context;

  return exports;
}
