import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import _concatInstanceProperty from "core-js-pure/features/instance/concat.js";
import _Symbol$asyncIterator from "core-js-pure/features/symbol/async-iterator.js";
import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
import OverloadYield from "./OverloadYield.js";
import regeneratorAsync from "./regeneratorAsync.js";
import regeneratorAsyncGen from "./regeneratorAsyncGen.js";
import regeneratorKeys from "./regeneratorKeys.js";
import regeneratorValues from "./regeneratorValues.js";
import regeneratorDefine from "./regeneratorDefine.js";
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var t,
    e = Object.prototype,
    r = e.hasOwnProperty,
    n = "function" == typeof _Symbol ? _Symbol : {},
    o = n.iterator || "@@iterator",
    i = n.toStringTag || "@@toStringTag";
  function a(e, r, n, o) {
    var i = r && r.prototype instanceof Generator ? r : Generator,
      a = _Object$create(i.prototype),
      c = new Context(o || []);
    return regeneratorDefine(a, "_invoke", function (e, r, n) {
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
          var c = n.delegate;
          if (c) {
            var s = y(c, n);
            if (s) {
              if (s === u) continue;
              return s;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (1 === o) throw o = 4, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = 3;
          var h = p(e, r, n);
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
    }(e, n, c), !0), a;
  }
  var u = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var c = {};
  regeneratorDefine(c, o, function () {
    return this;
  });
  var s = _Object$getPrototypeOf,
    h = s && s(s(regeneratorValues([])));
  h && h !== e && r.call(h, o) && (c = h);
  var f = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(c);
  function l(t) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(t, i, "GeneratorFunction")), t.prototype = _Object$create(f), t;
  }
  function p(t, e, r) {
    try {
      return {
        e: 0,
        v: t.call(e, r)
      };
    } catch (t) {
      return {
        e: 1,
        v: t
      };
    }
  }
  function y(e, r) {
    var n = r.method,
      o = e.i[n];
    if (o === t) return r.delegate = null, "throw" === n && e.i["return"] && (r.method = "return", r.arg = t, y(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), u;
    var i = p(o, e.i, r.arg);
    if (i.e) return r.method = "throw", r.arg = i.v, r.delegate = null, u;
    var a = i.v;
    return a ? a.done ? (r[e.r] = a.value, r.next = e.n, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, u) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, u);
  }
  function d(e) {
    var r = e[4] || {};
    r.type = "normal", r.arg = t, e[4] = r;
  }
  function Context(t) {
    var _context;
    this.tryEntries = _concatInstanceProperty(_context = [[-1]]).call(_context, t), this.reset(!0);
  }
  function v(t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }
  function g(t, e) {
    function r(n, o, i, a) {
      try {
        var u = t[n](o),
          c = u.value;
        return c instanceof OverloadYield ? e.resolve(c.v).then(function (t) {
          r("next", t, i, a);
        }, function (t) {
          r("throw", t, i, a);
        }) : e.resolve(c).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return r("throw", t, i, a);
        });
      } catch (t) {
        a(t);
      }
    }
    var n;
    this.next || (regeneratorDefine(g.prototype), regeneratorDefine(g.prototype, "function" == typeof _Symbol && _Symbol$asyncIterator || "@asyncIterator", function () {
      return this;
    })), regeneratorDefine(this, "_invoke", function (t, o, i) {
      function a() {
        return new e(function (e, n) {
          r(t, i, e, n);
        });
      }
      return n = n ? n.then(a, a) : a();
    }, !0);
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(f, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, i, "GeneratorFunction"), regeneratorDefine(f), regeneratorDefine(f, i, "Generator"), regeneratorDefine(f, o, function () {
    return this;
  }), regeneratorDefine(f, "toString", function () {
    return "[object Generator]";
  }), Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      var _context2;
      if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, _forEachInstanceProperty(_context2 = this.tryEntries).call(_context2, d), !e) for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+_sliceInstanceProperty(n).call(n, 1)) && (this[n] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0][4];
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function n(t) {
        a.type = "throw", a.arg = e, r.next = t;
      }
      for (var o = r.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i[4],
          u = this.prev,
          c = i[1],
          s = i[2];
        if (-1 === i[0]) return n("end"), !1;
        if (!c && !s) throw Error("try statement without catch or finally");
        if (null != i[0] && i[0] <= u) {
          if (u < c) return this.method = "next", this.arg = t, n(c), !0;
          if (u < s) return n(s), !1;
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var n = this.tryEntries[r];
        if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
          var o = n;
          break;
        }
      }
      o && ("break" === t || "continue" === t) && o[0] <= e && e <= o[2] && (o = null);
      var i = o ? o[4] : {};
      return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o[2], u) : this.complete(i);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), u;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r[2] === t) return this.complete(r[4], r[3]), d(r), u;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r[0] === t) {
          var n = r[4];
          if ("throw" === n.type) {
            var o = n.arg;
            d(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        i: regeneratorValues(e),
        r: r,
        n: n
      }, "next" === this.method && (this.arg = t), u;
    }
  }, (_regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: a,
      isGeneratorFunction: v,
      mark: l,
      awrap: OverloadYield,
      AsyncIterator: g,
      async: function async(t, e, r, n, o) {
        return (v(e) ? regeneratorAsyncGen : regeneratorAsync)(t, e, r, n, o);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  })();
}
export { _regeneratorRuntime as default };