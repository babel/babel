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
function _regenerator() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag", u = ["next", "throw", "return"]; function c(r, n, o, i) { var a = n && n.prototype instanceof Generator ? n : Generator, c = Object.create(a.prototype); return _regeneratorDefine(c, "_invoke", function (r, n, o) { var i, a, c, p = 1, s = o || [], y = !1, d = 0, l = { prev: 0, next: 0, sent: e, stop: G, abrupt: v, finish: v.bind(e, 4), delegateYield: function delegateYield(t, r) { return a = _regeneratorValues(t), d = 0, c = e, l.next = r, f; } }; function G() { return y = !0, i; } function v(t, r) { d = t, c = r; for (var n = s.length - 1; !y && 1 !== p && n >= 0; --n) { var o, i = s[n], a = l.prev, u = i[0], G = i[1], v = i[2]; if (4 === t ? (o = v === r) && (d = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : u <= a && ((o = 1 === t && a < G) ? (d = 0, l.sent = r, l.next = G) : a < v && (o = 1 === t || !(3 === t && u <= r && r <= v)) && (i[4] = t, i[5] = r, l.next = v, d = 0)), o) break; } if (o || 1 !== t) return f; throw p = 4, r; } return function (o, s, h) { if (3 === p) throw Error("Generator is already running"); if (4 === p) { if (1 === s) throw h; return { value: e, done: !0 }; } for (d = s, c = h;;) { a || (0 === d ? l.sent = c : 1 === d ? v(1, c) : 2 === d ? (i = c, l.next = -1, v(2, c)) : l.next = c); try { if (a) { if (t = a[u[d]]) { if (t = t.call(a, c)) { if (!t) throw TypeError("iterator result is not an object"); if (!t.done) return t; c = t.value, 2 !== d && (d = 0); } } else 1 === d && (t = a["return"]) && t.call(a), 2 !== d && (c = TypeError("The iterator does not provide a '" + u[d] + "' method"), d = 1); a = e; } else if (p = 3, t = (-1 === l.next ? G : r).call(n, l), p = y ? 4 : 2, t !== f) return { value: t, done: y }; } catch (t) { p = 4, a = e, d = 1, c = t; } } }; }(r, o, i), !0), c; } var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; _regeneratorDefine(p, i, function () { return this; }); var s = Object.getPrototypeOf, y = s && s(s(_regeneratorValues([]))); y && y !== r && n.call(y, i) && (p = y); var d = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function l(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = Object.create(d), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(d, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = _regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefineIM(d), _regeneratorDefine(d, a, "Generator"), _regeneratorDefine(d, i, function () { return this; }), _regeneratorDefine(d, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: c, m: l }; })(); }
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
          return _context.stop();
      }
    }, _callee);
  }));
  return _agf.apply(this, arguments);
}
