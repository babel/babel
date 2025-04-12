"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es6.array.index-of.js");
require("core-js/modules/es6.number.constructor.js");
require("core-js/modules/es6.object.define-property.js");
require("core-js/modules/es6.object.keys.js");
require("core-js/modules/es6.array.filter.js");
require("core-js/modules/es6.object.get-own-property-descriptor.js");
require("core-js/modules/es6.array.for-each.js");
require("core-js/modules/es7.object.get-own-property-descriptors.js");
require("core-js/modules/es6.object.define-properties.js");
require("core-js/modules/es6.string.iterator.js");
require("core-js/modules/es6.array.iterator.js");
require("core-js/modules/web.dom.iterable.js");
require("core-js/modules/es6.object.create.js");
require("core-js/modules/es6.object.get-prototype-of.js");
require("core-js/modules/es6.object.set-prototype-of.js");
require("core-js/modules/es6.array.slice.js");
require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.promise.js");
require("core-js/modules/es6.symbol.js");
require("core-js/modules/es7.symbol.async-iterator.js");
function _regenerator() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var t, r = Object.prototype, e = r.hasOwnProperty, n = "function" == typeof Symbol ? Symbol : {}, o = n.iterator || "@@iterator", i = n.toStringTag || "@@toStringTag"; function a(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), u = new Context(o || []); return _regeneratorDefine(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var s = d(u, n); if (s) { if (s === h) continue; return s; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var c = _tryCatch(r, e, n); if (!c.e) { if (o = n.done ? 4 : 2, c.v === h) continue; return { value: c.v, done: n.done }; } o = 4, n.method = "throw", n.arg = c.v; } }; }(r, n, u), !0), a; } var h = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var u = {}; _regeneratorDefine(u, o, function () { return this; }); var s = Object.getPrototypeOf, c = s && s(s(_regeneratorValues([]))); c && c !== r && e.call(c, o) && (u = c); var f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(t, i, "GeneratorFunction")), t.prototype = Object.create(f), t; } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), h; var i = _tryCatch(o, r.i, e.arg); if (i.e) return e.method = "throw", e.arg = i.v, e.delegate = null, h; var a = i.v; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, h) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, h); } function l(t) { this.tryEntries.push(t); } function y(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(l, this), this.reset(!0); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = _regeneratorDefine(GeneratorFunctionPrototype, i, "GeneratorFunction"), _regeneratorDefineIM(f), _regeneratorDefine(f, i, "Generator"), _regeneratorDefine(f, o, function () { return this; }), _regeneratorDefine(f, "toString", function () { return "[object Generator]"; }), Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(y), !r) for (var n in this) "t" === n.charAt(0) && e.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], h = this.prev, u = i[1], s = i[2]; if (-1 === i[0]) return n("end"), !1; if (!u && !s) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= h) { if (h < u) return this.method = "next", this.arg = t, n(u), !0; if (h < s) return n(s), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], h) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), h; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), y(e), h; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; y(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: _regeneratorValues(r), r: e, n: n }, "next" === this.method && (this.arg = t), h; } }, (_regenerator = function _regenerator() { return { w: a, m: p, G: GeneratorFunction }; })(); }
function _tryCatch(t, r, e) { try { return { e: 0, v: t.call(r, e) }; } catch (t) { return { e: 1, v: t }; } }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@iterator"]; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var n = -1, r = function next() { for (; ++n < e.length;) if ({}.hasOwnProperty.call(e, n)) return next.value = e[n], next.done = !1, next; return next.value = void 0, next.done = !0, next; }; return r.next = r; } } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorDefineIM(e) { ["next", "throw", "return"].forEach(function (n) { _regeneratorDefine(e, n, function (e) { return this._invoke(n, e); }); }); }
function _regeneratorDefine(e, r, n, t) { _regeneratorDefine = function _regeneratorDefine(e, r, n, t) { return Object.defineProperty(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }); }; try { _regeneratorDefine({}, ""); } catch (e) { _regeneratorDefine = function _regeneratorDefine(e, r, n) { return e[r] = n; }; } return _regeneratorDefine(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _wrapAsyncGenerator(e) { return function () { return new AsyncGenerator(e.apply(this, arguments)); }; }
function AsyncGenerator(e) { var r, t; function resume(r, t) { try { var n = e[r](t), o = n.value, u = o instanceof _OverloadYield; Promise.resolve(u ? o.v : o).then(function (t) { if (u) { var i = "return" === r ? "return" : "next"; if (!o.k || t.done) return resume(i, t); t = e[i](t).value; } settle(n.done ? "return" : "normal", t); }, function (e) { resume("throw", e); }); } catch (e) { settle("throw", e); } } function settle(e, n) { switch (e) { case "return": r.resolve({ value: n, done: !0 }); break; case "throw": r.reject(n); break; default: r.resolve({ value: n, done: !1 }); } (r = r.next) ? resume(r.key, r.arg) : t = null; } this._invoke = function (e, n) { return new Promise(function (o, u) { var i = { key: e, arg: n, resolve: o, reject: u, next: null }; t ? t = t.next = i : (r = t = i, resume(e, n)); }); }, "function" != typeof e["return"] && (this["return"] = void 0); }
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; }, AsyncGenerator.prototype.next = function (e) { return this._invoke("next", e); }, AsyncGenerator.prototype["throw"] = function (e) { return this._invoke("throw", e); }, AsyncGenerator.prototype["return"] = function (e) { return this._invoke("return", e); };
function _OverloadYield(e, d) { this.v = e, this.k = d; }
var _x$y$a$b = {
    x: 1,
    y: 2,
    a: 3,
    b: 4
  },
  x = _x$y$a$b.x,
  y = _x$y$a$b.y,
  z = _objectWithoutProperties(_x$y$a$b, ["x", "y"]);
var n = _objectSpread({
  x: x,
  y: y
}, z);
function agf() {
  return _agf.apply(this, arguments);
}
function _agf() {
  _agf = _wrapAsyncGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _awaitAsyncGenerator(1);
        case 2:
          _context.next = 4;
          return 2;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _agf.apply(this, arguments);
}
