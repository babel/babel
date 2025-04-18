import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import _concatInstanceProperty from "core-js-pure/features/instance/concat.js";
import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
import regeneratorDefine from "./regeneratorDefine.js";
import regeneratorDefineIM from "./regeneratorDefineIM.js";
import regeneratorValues from "./regeneratorValues.js";
import tryCatch from "./tryCatch.js";
function _regenerator() {
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
      u = new Context(o || []);
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
          var u = n.delegate;
          if (u) {
            var s = d(u, n);
            if (s) {
              if (s === h) continue;
              return s;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (1 === o) throw o = 4, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = 3;
          var c = tryCatch(e, r, n);
          if (!c.e) {
            if (o = n.done ? 4 : 2, c.v === h) continue;
            return {
              value: c.v,
              done: n.done
            };
          }
          o = 4, n.method = "throw", n.arg = c.v;
        }
      };
    }(e, n, u), !0), a;
  }
  var h = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var u = {};
  regeneratorDefine(u, o, function () {
    return this;
  });
  var s = _Object$getPrototypeOf,
    c = s && s(s(regeneratorValues([])));
  c && c !== e && r.call(c, o) && (u = c);
  var f = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(u);
  function p(t) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(t, i, "GeneratorFunction")), t.prototype = _Object$create(f), t;
  }
  function d(e, r) {
    var n = r.method,
      o = e.i[n];
    if (o === t) return r.delegate = null, "throw" === n && e.i["return"] && (r.method = "return", r.arg = t, d(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), h;
    var i = tryCatch(o, e.i, r.arg);
    if (i.e) return r.method = "throw", r.arg = i.v, r.delegate = null, h;
    var a = i.v;
    return a ? a.done ? (r[e.r] = a.value, r.next = e.n, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, h) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, h);
  }
  function l(e) {
    var r = e[4] || {};
    r.type = "normal", r.arg = t, e[4] = r;
  }
  function Context(t) {
    var _context;
    this.tryEntries = _concatInstanceProperty(_context = [[-1]]).call(_context, t), this.reset(!0);
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(f, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = regeneratorDefine(GeneratorFunctionPrototype, i, "GeneratorFunction"), regeneratorDefineIM(f), regeneratorDefine(f, i, "Generator"), regeneratorDefine(f, o, function () {
    return this;
  }), regeneratorDefine(f, "toString", function () {
    return "[object Generator]";
  }), Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      var _context2;
      if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, _forEachInstanceProperty(_context2 = this.tryEntries).call(_context2, l), !e) for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+_sliceInstanceProperty(n).call(n, 1)) && (this[n] = t);
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
          h = this.prev,
          u = i[1],
          s = i[2];
        if (-1 === i[0]) return n("end"), !1;
        if (!u && !s) throw Error("try statement without catch or finally");
        if (null != i[0] && i[0] <= h) {
          if (h < u) return this.method = "next", this.arg = t, n(u), !0;
          if (h < s) return n(s), !1;
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
      return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o[2], h) : this.complete(i);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), h;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r[2] === t) return this.complete(r[4], r[3]), l(r), h;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r[0] === t) {
          var n = r[4];
          if ("throw" === n.type) {
            var o = n.arg;
            l(r);
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
      }, "next" === this.method && (this.arg = t), h;
    }
  }, (_regenerator = function _regenerator() {
    return {
      w: a,
      m: p
    };
  })();
}
export { _regenerator as default };