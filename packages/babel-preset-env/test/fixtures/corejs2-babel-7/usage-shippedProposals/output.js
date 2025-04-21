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
require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.promise.js");
require("core-js/modules/es6.symbol.js");
require("core-js/modules/es7.symbol.async-iterator.js");
function _regenerator() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, t = Object.prototype, e = t.hasOwnProperty, n = "function" == typeof Symbol ? Symbol : {}, o = n.iterator || "@@iterator", i = n.toStringTag || "@@toStringTag", a = ["next", "throw", "return"]; function u(t, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, u = Object.create(i.prototype); return _regeneratorDefine(u, "_invoke", function (t, e, n) { var o = 1; function i(t) { var e = l, n = t.i[a[e]]; if (n === r) return y = null, 1 === e && t.i["return"] && (l = 2, s = r, i(t), 1 === l) || 2 !== e && (l = 1, s = new TypeError("The iterator does not provide a '" + a[e] + "' method")), f; var o = _tryCatch(n, t.i, s); if (o.e) return l = 1, s = o.v, y = null, f; var u = o.v; return u ? u.done ? (d[t.r] = u.value, d.next = t.n, 2 !== l && (l = 0, s = r), y = null, f) : u : (l = 1, s = new TypeError("iterator result is not an object"), y = null, f); } function u(t) { var e = t[4] || {}; e.type = 0, e.arg = r, t[4] = e; } var c, p = [[-1]].concat(n || []), v = !1, y = null, l = 0, s = r; p.forEach(u); var d = { prev: 0, next: 0, sent: r, stop: g, abrupt: G, finish: function finish(r) { for (var t = p.length - 1; t >= 0; --t) { var e = p[t]; if (e[2] === r) return F(e[4], e[3]), u(e), f; } }, "catch": function _catch(r) { for (var t = p.length - 1; t >= 0; --t) { var e = p[t]; if (e[0] === r) { var n = e[4]; if (1 === n.type) { var o = n.arg; u(e); } return o; } } }, delegateYield: function delegateYield(t, e, n) { return y = { i: _regeneratorValues(t), r: e, n: n }, 0 === l && (s = r), f; } }; function g() { v = !0; var r = p[0][4]; if (1 === r.type) throw r.arg; return c; } function h(t) { if (v) throw t; function e(r) { i.type = 1, i.arg = t, d.next = r; } for (var n = p.length - 1; n >= 0; --n) { var o = p[n], i = o[4], a = d.prev, u = o[1], f = o[2]; if (-1 === o[0]) return e(-1), !1; if (null != o[0] && o[0] <= a) { if (a < u) return l = 0, s = r, e(u), !0; if (a < f) return e(f), !1; } } } function G(r, t) { for (var e = p.length - 1; e >= 0; --e) { var n = p[e]; if (n[0] > -1 && n[0] <= d.prev && d.prev < n[2]) { var o = n; break; } } o && (2 === r || 3 === r) && o[0] <= t && t <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = r, i.arg = t, o ? (l = 0, d.next = o[2], f) : F(i); } function F(r, t) { if (1 === r.type) throw r.arg; return 2 === r.type || 3 === r.type ? d.next = r.arg : 4 === r.type ? (c = s = r.arg, l = 2, d.next = -1) : 0 === r.type && t && (d.next = t), f; } return function (n, u) { if (n = a.indexOf(n), 3 === o) throw Error("Generator is already running"); if (4 === o) { if (1 === n) throw u; return { value: r, done: !0 }; } for (l = n, s = u;;) { if (y) { var c = i(y); if (c) { if (c === f) continue; return c; } } if (0 === l) d.sent = s;else if (1 === l) { if (1 === o) throw o = 4, s; h(s); } else 2 === l && G(4, s); o = 3; var p = _tryCatch(-1 === d.next ? g : t, e, d); if (!p.e) { if (o = v ? 4 : 2, p.v === f) continue; return { value: p.v, done: v }; } o = 4, l = 1, s = p.v; } }; }(t, n, o), !0), u; } var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var c = {}; _regeneratorDefine(c, o, function () { return this; }); var p = Object.getPrototypeOf, v = p && p(p(_regeneratorValues([]))); v && v !== t && e.call(v, o) && (c = v); var y = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function l(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(r, i, "GeneratorFunction")), r.prototype = Object.create(y), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(y, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = _regeneratorDefine(GeneratorFunctionPrototype, i, "GeneratorFunction"), _regeneratorDefineIM(y), _regeneratorDefine(y, i, "Generator"), _regeneratorDefine(y, o, function () { return this; }), _regeneratorDefine(y, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: u, m: l }; })(); }
function _tryCatch(t, r, e) { try { return { e: 0, v: t.call(r, e) }; } catch (t) { return { e: 1, v: t }; } }
function _regeneratorValues(e) { if (null != e) { var r = e["function" == typeof Symbol && Symbol.iterator || "@iterator"]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var t = -1, n = function r() { for (; ++t < e.length;) if ({}.hasOwnProperty.call(e, t)) return r.value = e[t], r.done = !1, r; return r.value = void 0, r.done = !0, r; }; return n.next = n; } } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorDefineIM(e) { function n(n) { _regeneratorDefine(e, n, function (e) { return this._invoke(n, e); }); } n("next"), n("throw"), n("return"); }
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
          return _context.stop();
      }
    }, _callee);
  }));
  return _agf.apply(this, arguments);
}
