/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

(function(
  // Reliable reference to the global object (i.e. window in browsers).
  global,

  // Dummy constructor that we use as the .constructor property for
  // functions that return Generator objects.
  GeneratorFunction
) {
  var hasOwn = Object.prototype.hasOwnProperty;

  if (global.wrapGenerator) {
    return;
  }

  function wrapGenerator(innerFn, self) {
    return new Generator(innerFn, self || null);
  }

  global.wrapGenerator = wrapGenerator;
  if (typeof exports !== "undefined") {
    exports.wrapGenerator = wrapGenerator;
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  wrapGenerator.mark = function(genFun) {
    genFun.constructor = GeneratorFunction;
    return genFun;
  };

  // Ensure isGeneratorFunction works when Function#name not supported.
  if (GeneratorFunction.name !== "GeneratorFunction") {
    GeneratorFunction.name = "GeneratorFunction";
  }

  wrapGenerator.isGeneratorFunction = function(genFun) {
    var ctor = genFun && genFun.constructor;
    return ctor ? GeneratorFunction.name === ctor.name : false;
  };

  function Generator(innerFn, self) {
    var generator = this;
    var context = new Context();
    var state = GenStateSuspendedStart;

    function invoke() {
      state = GenStateExecuting;
      do {
        var value = innerFn.call(self, context);
      } while (value === ContinueSentinel);
      // If an exception is thrown from innerFn, we leave state ===
      // GenStateExecuting and loop back for another invocation.
      state = context.done
        ? GenStateCompleted
        : GenStateSuspendedYield;
      return { value: value, done: context.done };
    }

    function assertCanInvoke() {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        throw new Error("Generator has already finished");
      }
    }

    function handleDelegate(method, arg) {
      var delegate = context.delegate;
      if (delegate) {
        try {
          var info = delegate.generator[method](arg);
        } catch (uncaught) {
          context.delegate = null;
          return generator.throw(uncaught);
        }

        if (info) {
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            return info;
          }
        }

        context.delegate = null;
      }
    }

    generator.next = function(value) {
      assertCanInvoke();

      var delegateInfo = handleDelegate("next", value);
      if (delegateInfo) {
        return delegateInfo;
      }

      if (state === GenStateSuspendedYield) {
        context.sent = value;
      }

      while (true) try {
        return invoke();
      } catch (exception) {
        context.dispatchException(exception);
      }
    };

    generator.throw = function(exception) {
      assertCanInvoke();

      var delegateInfo = handleDelegate("throw", exception);
      if (delegateInfo) {
        return delegateInfo;
      }

      if (state === GenStateSuspendedStart) {
        state = GenStateCompleted;
        throw exception;
      }

      while (true) {
        context.dispatchException(exception);
        try {
          return invoke();
        } catch (thrown) {
          exception = thrown;
        }
      }
    };
  }

  Generator.prototype.toString = function() {
    return "[object Generator]";
  };

  function Context() {
    this.reset();
  }

  Context.prototype = {
    constructor: Context,

    reset: function() {
      this.next = 0;
      this.sent = void 0;
      this.tryStack = [];
      this.done = false;
      this.delegate = null;

      // Pre-initialize at least 20 temporary variables to enable hidden
      // class optimizations for simple generators.
      for (var tempIndex = 0, tempName;
           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
           ++tempIndex) {
        this[tempName] = null;
      }
    },

    stop: function() {
      this.done = true;

      if (hasOwn.call(this, "thrown")) {
        var thrown = this.thrown;
        delete this.thrown;
        throw thrown;
      }

      return this.rval;
    },

    keys: function(object) {
      return Object.keys(object).reverse();
    },

    pushTry: function(catchLoc, finallyLoc, finallyTempVar) {
      if (finallyLoc) {
        this.tryStack.push({
          finallyLoc: finallyLoc,
          finallyTempVar: finallyTempVar
        });
      }

      if (catchLoc) {
        this.tryStack.push({
          catchLoc: catchLoc
        });
      }
    },

    popCatch: function(catchLoc) {
      var lastIndex = this.tryStack.length - 1;
      var entry = this.tryStack[lastIndex];

      if (entry && entry.catchLoc === catchLoc) {
        this.tryStack.length = lastIndex;
      }
    },

    popFinally: function(finallyLoc) {
      var lastIndex = this.tryStack.length - 1;
      var entry = this.tryStack[lastIndex];

      if (!entry || !hasOwn.call(entry, "finallyLoc")) {
        entry = this.tryStack[--lastIndex];
      }

      if (entry && entry.finallyLoc === finallyLoc) {
        this.tryStack.length = lastIndex;
      }
    },

    dispatchException: function(exception) {
      var finallyEntries = [];
      var dispatched = false;

      if (this.done) {
        throw exception;
      }

      // Dispatch the exception to the "end" location by default.
      this.thrown = exception;
      this.next = "end";

      for (var i = this.tryStack.length - 1; i >= 0; --i) {
        var entry = this.tryStack[i];
        if (entry.catchLoc) {
          this.next = entry.catchLoc;
          dispatched = true;
          break;
        } else if (entry.finallyLoc) {
          finallyEntries.push(entry);
          dispatched = true;
        }
      }

      while ((entry = finallyEntries.pop())) {
        this[entry.finallyTempVar] = this.next;
        this.next = entry.finallyLoc;
      }
    },

    delegateYield: function(generator, resultName, nextLoc) {
      var info = generator.next(this.sent);

      if (info.done) {
        this.delegate = null;
        this[resultName] = info.value;
        this.next = nextLoc;

        return ContinueSentinel;
      }

      this.delegate = {
        generator: generator,
        resultName: resultName,
        nextLoc: nextLoc
      };

      return info.value;
    }
  };
}).apply(this, Function("return [this, function GeneratorFunction(){}]")());
