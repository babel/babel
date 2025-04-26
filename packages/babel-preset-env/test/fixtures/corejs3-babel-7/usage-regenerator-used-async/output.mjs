function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag", u = ["next", "throw", "return"]; function c(r, n, o, i) { var a = n && n.prototype instanceof Generator ? n : Generator, c = Object.create(a.prototype); return _regeneratorDefine(c, "_invoke", function (r, n, o) { var i, a, c, p = 0, s = o || [], y = !1, d = { prev: 0, next: 0, sent: e, abrupt: l, finish: l.bind(e, 4), delegateYield: function delegateYield(t, r) { return i = _regeneratorValues(t), a = 0, c = e, d.next = r, f; } }; function l(t, r) { a = t, c = r; for (var n = s.length - 1; !y && p && n >= 0; --n) { var o, i = s[n], u = d.prev, l = i[2]; if (t > 3 ? (o = l === r) && (a = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= u && ((o = t < 2 && u < i[1]) ? (a = 0, d.sent = r, d.next = i[1]) : u < l && (o = t < 3 || i[0] > r || r > l) && (i[4] = t, i[5] = r, d.next = l, a = 0)), o) break; } if (o || t > 1) return f; throw y = !0, r; } return function (o, s, G) { if (2 === p) throw Error("Generator is already running"); for (y && 1 === s && l(s, G), a = s, c = G; !y || (t = e);) { i || (a ? a < 3 ? (a > 1 && (d.next = -1), l(a, c)) : d.next = c : d.sent = c); try { if (i) { if (t = i[u[a]]) { if (t = t.call(i, c)) { if (!t) throw TypeError("iterator result is not an object"); if (!t.done) return t; c = t.value, a < 2 && (a = 0); } } else 1 === a && (t = i[u[2]]) && t.call(i), a < 2 && (c = TypeError("The iterator does not provide a '" + u[a] + "' method"), a = 1); i = e; } else if (p = 2, t = (y = d.next < 0) ? c : r.call(n, d), p = y ? 3 : 1, t !== f) break; } catch (t) { p = 3, i = e, a = 1, c = t; } } return { value: t, done: y }; }; }(r, o, i), !0), c; } var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; _regeneratorDefine(p, i, function () { return this; }); var s = Object.getPrototypeOf, y = s && s(s(_regeneratorValues([]))); y && y !== r && n.call(y, i) && (p = y); var d = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function l(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = Object.create(d), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(d, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = _regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefineIM(d), _regeneratorDefine(d, a, "Generator"), _regeneratorDefine(d, i, function () { return this; }), _regeneratorDefine(d, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: c, m: l }; })(); }
function _regeneratorValues(e) { if (null != e) { var r = e["function" == typeof Symbol && Symbol.iterator || "@iterator"]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var t = -1, n = function r() { for (; ++t < e.length;) if ({}.hasOwnProperty.call(e, t)) return r.value = e[t], r.done = !1, r; return r.value = void 0, r.done = !0, r; }; return n.next = n; } } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorDefineIM(e) { function n(n, t) { _regeneratorDefine(e, n, function (e) { return this._invoke(n, t, e); }); } n("next", 0), n("throw", 1), n("return", 2); }
function _regeneratorDefine(e, r, n, t) { _regeneratorDefine = function _regeneratorDefine(e, r, n, t) { return Object.defineProperty(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }); }; try { _regeneratorDefine({}, ""); } catch (e) { _regeneratorDefine = function _regeneratorDefine(e, r, n) { return e[r] = n; }; } return _regeneratorDefine(e, r, n, t); }
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.function.bind.js";
import "core-js/modules/es.object.create.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function a() {
  return _a.apply(this, arguments);
}
function _a() {
  _a = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt(2);
      }
    }, _callee);
  }));
  return _a.apply(this, arguments);
}
