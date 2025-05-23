import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import _concatInstanceProperty from "core-js-pure/features/instance/concat.js";
import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
import OverloadYield from "./OverloadYield.js";
import regeneratorAsync from "./regeneratorAsync.js";
import regeneratorAsyncGen from "./regeneratorAsyncGen.js";
import regeneratorAsyncIterator from "./regeneratorAsyncIterator.js";
import regeneratorKeys from "./regeneratorKeys.js";
import regeneratorValues from "./regeneratorValues.js";
import regeneratorDefine from "./regeneratorDefine.js";
import tryCatch from "./tryCatch.js";
import regeneratorDefineIM from "./regeneratorDefineIM.js";
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var t,
    r = Object.prototype,
    e = r.hasOwnProperty,
    n = "function" == typeof _Symbol ? _Symbol : {},
    o = n.iterator || "@@iterator",
    i = n.toStringTag || "@@toStringTag";
  function a(r, e, n, o) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = _Object$create(i.prototype),
      s = new Context(o || []);
    return regeneratorDefine(a, "_invoke", function (r, e, n) {
      var o = 1;
      return function (i, a) {
        if (3 === o) throw Error("Generator is already running");
        if (4 === o) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var s = n.delegate;
          if (s) {
            var c = y(s, n);
            if (c) {
              if (c === u) continue;
              return c;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (1 === o) throw o = 4, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = 3;
          var h = tryCatch(r, e, n);
          if (!h.e) {
            if (o = n.done ? 4 : 2, h.v === u) continue;
            return {
              value: h.v,
              done: n.done
            };
          }
          o = 4, n.method = "throw", n.arg = h.v;
        }
      };
    }(r, n, s), !0), a;
  }
  var u = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var s = {};
  regeneratorDefine(s, o, function () {
    return this;
  });
  var c = _Object$getPrototypeOf,
    h = c && c(c(regeneratorValues([])));
  h && h !== r && e.call(h, o) && (s = h);
  var f = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(s);
  function p(t) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(t, i, "GeneratorFunction")), t.prototype = _Object$create(f), t;
  }
  function y(r, e) {
    var n = e.method,
      o = r.i[n];
    if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, y(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), u;
    var i = tryCatch(o, r.i, e.arg);
    if (i.e) return e.method = "throw", e.arg = i.v, e.delegate = null, u;
    var a = i.v;
    return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, u) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, u);
  }
  function l(r) {
    var e = r[4] || {};
    e.type = "normal", e.arg = t, r[4] = e;
  }
  function Context(t) {
    var _context;
    this.tryEntries = _concatInstanceProperty(_context = [[-1]]).call(_context, t), this.reset(!0);
  }
  function d(t) {
    var r = "function" == typeof t && t.constructor;
    return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name));
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(f, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, i, "GeneratorFunction"), regeneratorDefineIM(f), regeneratorDefine(f, i, "Generator"), regeneratorDefine(f, o, function () {
    return this;
  }), regeneratorDefine(f, "toString", function () {
    return "[object Generator]";
  }), Context.prototype = {
    constructor: Context,
    reset: function reset(r) {
      var _context2;
      if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, _forEachInstanceProperty(_context2 = this.tryEntries).call(_context2, l), !r) for (var n in this) "t" === n.charAt(0) && e.call(this, n) && !isNaN(+_sliceInstanceProperty(n).call(n, 1)) && (this[n] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0][4];
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(r) {
      if (this.done) throw r;
      var e = this;
      function n(t) {
        a.type = "throw", a.arg = r, e.next = t;
      }
      for (var o = e.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i[4],
          u = this.prev,
          s = i[1],
          c = i[2];
        if (-1 === i[0]) return n("end"), !1;
        if (!s && !c) throw Error("try statement without catch or finally");
        if (null != i[0] && i[0] <= u) {
          if (u < s) return this.method = "next", this.arg = t, n(s), !0;
          if (u < c) return n(c), !1;
        }
      }
    },
    abrupt: function abrupt(t, r) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var n = this.tryEntries[e];
        if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
          var o = n;
          break;
        }
      }
      o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null);
      var i = o ? o[4] : {};
      return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], u) : this.complete(i);
    },
    complete: function complete(t, r) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), u;
    },
    finish: function finish(t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var e = this.tryEntries[r];
        if (e[2] === t) return this.complete(e[4], e[3]), l(e), u;
      }
    },
    "catch": function _catch(t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var e = this.tryEntries[r];
        if (e[0] === t) {
          var n = e[4];
          if ("throw" === n.type) {
            var o = n.arg;
            l(e);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(r, e, n) {
      return this.delegate = {
        i: regeneratorValues(r),
        r: e,
        n: n
      }, "next" === this.method && (this.arg = t), u;
    }
  }, (_regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: a,
      isGeneratorFunction: d,
      mark: p,
      awrap: function awrap(t, r) {
        return new OverloadYield(t, r);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(t, r, e, n, o) {
        return (d(r) ? regeneratorAsyncGen : regeneratorAsync)(t, r, e, n, o);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  })();
}
export { _regeneratorRuntime as default };