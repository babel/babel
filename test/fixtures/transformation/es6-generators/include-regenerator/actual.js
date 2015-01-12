"use strict";

!(function () {
  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined;
  var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator || "@@iterator";
  if (typeof regeneratorRuntime === "object") {
    return;
  }
  var runtime = regeneratorRuntime = typeof exports === "undefined" ? {} : exports;
  function wrap(innerFn, outerFn, self, tryList) {
    return new Generator(innerFn, outerFn, self || null, tryList || []);
  }

  runtime.wrap = wrap;
  var GenStateSuspendedStart = "suspendedStart";

  var GenStateSuspendedYield = "suspendedYield";

  var GenStateExecuting = "executing";

  var GenStateCompleted = "completed";

  var ContinueSentinel = {};

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";
  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  runtime.async = function (innerFn, outerFn, self, tryList) {
    return new Promise(function (resolve, reject) {
      var generator = wrap(innerFn, outerFn, self, tryList);

      var callNext = step.bind(generator.next);

      var callThrow = step.bind(generator["throw"]);

      function step(arg) {
        try {
          var info = this(arg);

          var value = info.value;
        } catch (error) {
          return reject(error);
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(callNext, callThrow);
        }
      }

      callNext();
    });
  };

  function Generator(innerFn, outerFn, self, tryList) {
    var generator = outerFn ? Object.create(outerFn.prototype) : this;
    var context = new Context(tryList);
    var state = GenStateSuspendedStart;
    function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }
      if (state === GenStateCompleted) {
        return doneResult();
      }
      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          try {
            var info = delegate.iterator[method](arg);

            method = "next";
            arg = undefined;
          } catch (uncaught) {
            context.delegate = null;
            method = "throw";
            arg = uncaught;
            continue;
          }
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }
          context.delegate = null;
        }
        if (method === "next") {
          if (state === GenStateSuspendedStart && typeof arg !== "undefined") {
            throw new TypeError("attempt to send " + JSON.stringify(arg) + " to newborn generator");
          }
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            delete context.sent;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }
          if (context.dispatchException(arg)) {
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }
        state = GenStateExecuting;
        try {
          var value = innerFn.call(self, context);

          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
          var info = {
            value: value,
            done: context.done
          };

          if (value === ContinueSentinel) {
            if (context.delegate && method === "next") {
              arg = undefined;
            }
          } else {
            return info;
          }
        } catch (thrown) {
          state = GenStateCompleted;
          if (method === "next") {
            context.dispatchException(thrown);
          } else {
            arg = thrown;
          }
        }
      }
    }

    generator.next = invoke.bind(generator, "next");
    generator["throw"] = invoke.bind(generator, "throw");
    generator["return"] = invoke.bind(generator, "return");
    return generator;
  }

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(triple) {
    var entry = {
      tryLoc: triple[0]
    };

    if (1 in triple) {
      entry.catchLoc = triple[1];
    }
    if (2 in triple) {
      entry.finallyLoc = triple[2];
    }
    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry, i) {
    var record = entry.completion || {};
    record.type = i === 0 ? "normal" : "return";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryList) {
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryList.forEach(pushTryEntry, this);

    this.reset();
  }

  runtime.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse();

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }
      if (typeof iterable.next === "function") {
        return iterable;
      }
      if (!isNaN(iterable.length)) {
        var i = -1;
        function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }
          next.value = undefined;
          next.done = true;
          return next;
        }

        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }

  runtime.values = values;
  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function () {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;
      this.tryEntries.forEach(resetTryEntry);

      for (var tempIndex = 0, tempName; hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20; ++tempIndex) {
        this[tempName] = null;
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
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
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;
        if (entry.tryLoc === "root") {
          return handle("end");
        }
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");

          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    _findFinallyEntry: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && (entry.finallyLoc === finallyLoc || this.prev < entry.finallyLoc)) {
          return entry;
        }
      }
    },
    abrupt: function (type, arg) {
      var entry = this._findFinallyEntry();

      var record = entry ? entry.completion : {};
      record.type = type;
      record.arg = arg;
      if (entry) {
        this.next = entry.finallyLoc;
      } else {
        this.complete(record);
      }
      return ContinueSentinel;
    },
    complete: function (record) {
      if (record.type === "throw") {
        throw record.arg;
      }
      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      }
      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      var entry = this._findFinallyEntry(finallyLoc);

      return this.complete(entry.completion);
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry, i);
          }
          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };
      return ContinueSentinel;
    }
  };
})();
var x = regeneratorRuntime.mark(function x() {
  return regeneratorRuntime.wrap(function x$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
      case "end":
        return context$1$0.stop();
    }
  }, x, this);
});
