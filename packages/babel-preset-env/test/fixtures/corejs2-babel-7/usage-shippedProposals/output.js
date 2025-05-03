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
require("core-js/modules/es6.function.bind.js");
require("core-js/modules/es6.object.get-prototype-of.js");
require("core-js/modules/es6.object.set-prototype-of.js");
require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.promise.js");
require("core-js/modules/es6.symbol.js");
require("core-js/modules/es7.symbol.async-iterator.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function u(r, n, o, i) { var a = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(a.prototype); return _regeneratorDefine(u, "_invoke", function (r, n, o) { var i, a, u, f = 0, p = o || [], y = !1, l = { prev: 0, next: 0, sent: e, abrupt: d, finish: d.bind(e, 4), delegateYield: function delegateYield(t, r) { return i = _regeneratorValues(t), a = 0, u = e, l.next = r, c; } }; function d(r, n) { for (a = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = l.prev, s = i[2]; r > 3 ? (o = s === n) && (a = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (a = 0, l.sent = n, l.next = i[1]) : d < s && (o = r < 3 || i[0] > n || n > s) && (i[4] = r, i[5] = n, l.next = s, a = 0)); } if (o || r > 1) return c; throw y = !0, n; } return function (o, p, s) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, s), a = p, u = s; (t = a < 2 ? e : u) || !y;) { i || (a ? a < 3 ? (a > 1 && (l.next = -1), d(a, u)) : l.next = u : l.sent = u); try { if (f = 2, i) { if (a || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, a < 2 && (a = 0); } else 1 === a && (t = i["return"]) && t.call(i), a < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), a = 1); i = e; } else if ((t = (y = l.next < 0) ? u : r.call(n, l)) !== c) break; } catch (t) { i = e, a = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var f = {}; _regeneratorDefine(f, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(_regeneratorValues([]))); y && y !== r && n.call(y, i) && (f = y); var l = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(f); function d(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = Object.create(l), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(l, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefineIM(l), _regeneratorDefine(l, a, "Generator"), _regeneratorDefine(l, i, function () { return this; }), _regeneratorDefine(l, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: u, m: d }; })(); }
function _regeneratorValues(e) { if (null != e) { var r = e["function" == typeof Symbol && Symbol.iterator || "@iterator"]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var t = -1, n = function r() { for (; ++t < e.length;) if ({}.hasOwnProperty.call(e, t)) return r.value = e[t], r.done = !1, r; return r.value = void 0, r.done = !0, r; }; return n.next = n; } } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorDefineIM(e) { function n(n, t) { _regeneratorDefine(e, n, function (e) { return this._invoke(n, t, e); }); } n("next", 0), n("throw", 1), n("return", 2); }
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
    return _regenerator().w(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _awaitAsyncGenerator(1);
        case 2:
          _context.next = 4;
          return 2;
        case 4:
          return _context.abrupt(2);
      }
    }, _callee);
  }));
  return _agf.apply(this, arguments);
}
