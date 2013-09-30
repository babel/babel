(function(global) {
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

  function Generator(innerFn, self) {
    var generator = this;
    var context = new Context;
    var state = GenStateSuspendedStart;

    function invoke() {
      state = GenStateExecuting;
      do var value = innerFn.call(self, context);
      while (value === ContinueSentinel);
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

    generator.next = function(value) {
      assertCanInvoke();

      if (context.delegate) {
        var info = context.delegate.next(value);
        if (info.done) {
          context.delegate = null;
        } else {
          return info;
        }
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

    generator["throw"] = function(exception) {
      assertCanInvoke();

      if (context.delegate) {
        var info = context.delegate["throw"](exception);
        if (info.done) {
          context.delegate = null;
        } else {
          return info;
        }
      }

      if (state === GenStateSuspendedStart) {
        state = GenStateCompleted;
        throw exception;
      }

      while (true) try {
        context.dispatchException(exception);
        return invoke();
      } catch (thrown) {
        exception = thrown;
      }
    };
  }

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
      var tempIndex = 0;
      var tempName;
      while (tempName = "t" + tempIndex, // N.B. Comma operator!
             tempIndex < 20 || hasOwn.call(this, tempName)) {
        this[tempName] = null;
        ++tempIndex;
      }
    },

    stop: function() {
      if (hasOwn.call(this, "thrown")) {
        var thrown = this.thrown;
        delete this.thrown;
        throw thrown;
      }

      this.done = true;
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
      var entry;
      var finallyEntries = [];
      var dispatched = false;

      if (this.done) {
        throw exception;
      }

      for (var i = this.tryStack.length - 1; i >= 0; --i) {
        entry = this.tryStack[i];
        if (entry.catchLoc) {
          this.thrown = exception;
          this.next = entry.catchLoc;
          dispatched = true;
          break;
        } else if (entry.finallyLoc) {
          finallyEntries.push(entry);
          dispatched = true;
        }
      }

      if (!dispatched) {
        throw exception;
      }

      while ((entry = finallyEntries.pop())) {
        this[entry.finallyTempVar] = this.next;
        this.next = entry.finallyLoc;
      }
    },

    delegateYield: function(delegate, afterLoc) {
      this.next = afterLoc;
      var info = delegate.next(this.sent);
      if (info.done) {
        this.delegate = null;
        return ContinueSentinel;
      } else {
        this.delegate = delegate;
        return info.value;
      }
    }
  };
})(Function("return this")());
