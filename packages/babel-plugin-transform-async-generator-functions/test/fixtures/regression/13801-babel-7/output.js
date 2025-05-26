function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function r(n, o, i, f) { var a = _tryCatch(t[n], t, o); if (!a.e) { var c = a.v, u = c.value; return u && u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { r("next", t, i, f); }, function (t) { r("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return r("throw", t, i, f); }); } f(a.v); } var n; this.next || (_regeneratorDefineIM(_regeneratorAsyncIterator.prototype), _regeneratorDefine(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, n) { r(t, i, e, n); }); } return n = n ? n.then(f, f) : f(); }, !0); }
function _tryCatch(t, r, e) { try { return { e: 0, v: t.call(r, e) }; } catch (t) { return { e: 1, v: t }; } }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function u(r, n, o, i) { var a = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(a.prototype); return _regeneratorDefine(u, "_invoke", function (r, n, o) { var i, a, u, f = 0, p = o || [], y = !1, d = { p: 0, n: 0, v: e, a: l, f: l.bind(e, 4), d: function (t, r) { return i = _regeneratorValues(t), a = 0, u = e, d.n = r, c; } }; function l(r, n) { for (a = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], l = d.p, G = i[2]; r > 3 ? (o = G === n) && (a = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= l && ((o = r < 2 && l < i[1]) ? (a = 0, d.v = n, d.n = i[1]) : l < G && (o = r < 3 || i[0] > n || n > G) && (i[4] = r, i[5] = n, d.n = G, a = 0)); } if (o || r > 1) return c; throw y = !0, n; } return function (o, p, G) { if (2 === f) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, G), a = p, u = G; !y || (t = e);) { i || (a ? a < 3 ? (a > 1 && (d.n = -1), l(a, u)) : d.n = u : d.v = u); try { if (i) { if (a || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, a < 2 && (a = 0); } else 1 === a && (t = i.return) && t.call(i), a < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), a = 1); i = e; } else if (f = 2, t = (y = d.n < 0) ? u : r.call(n, d), f = y ? 3 : 1, t !== c) break; } catch (t) { f = 3, i = e, a = 1, u = t; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var f = {}; _regeneratorDefine(f, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(_regeneratorValues([]))); y && y !== r && n.call(y, i) && (f = y); var d = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(f); function l(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = Object.create(d), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(d, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefineIM(d), _regeneratorDefine(d, a, "Generator"), _regeneratorDefine(d, i, function () { return this; }), _regeneratorDefine(d, "toString", function () { return "[object Generator]"; }), (_regenerator = function () { return { w: u, m: l }; })(); }
function _regeneratorValues(e) { if (null != e) { var r = e["function" == typeof Symbol && Symbol.iterator || "@iterator"]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var t = -1, n = function r() { for (; ++t < e.length;) if ({}.hasOwnProperty.call(e, t)) return r.value = e[t], r.done = !1, r; return r.value = void 0, r.done = !0, r; }; return n.next = n; } } throw new TypeError(typeof e + " is not iterable"); }
function _regeneratorDefineIM(e) { function n(n, t) { _regeneratorDefine(e, n, function (e) { return this._invoke(n, t, e); }); } n("next", 0), n("throw", 1), n("return", 2); }
function _regeneratorDefine(e, r, n, t) { _regeneratorDefine = function (e, r, n, t) { return Object.defineProperty(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }); }; try { _regeneratorDefine({}, ""); } catch (e) { _regeneratorDefine = function (e, r, n) { return e[r] = n; }; } return _regeneratorDefine(e, r, n, t); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function (r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function () { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function (r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function (r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
function main() {
  var one;
  return _regeneratorAsync(function (_context2) {
    while (1) switch (_context2.p = _context2.n) {
      case 0:
        () => {
          var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, string, _t;
          return _regeneratorAsync(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                // IIFE: required for babel to crash
                _iteratorAbruptCompletion = false;
                _didIteratorError = false;
                _context.p = 2;
                _iterator = _asyncIterator(async_iterable);
              case 4:
                _context.n = 6;
                return _awaitAsyncGenerator(_iterator.next());
              case 6:
                if (!(_iteratorAbruptCompletion = !(_step = _context.v).done)) {
                  _context.n = 12;
                  break;
                }
                string = _step.value;
                // for await: required for babel to crash
                console.log(string);
              case 9:
                _iteratorAbruptCompletion = false;
                _context.n = 4;
                break;
              case 12:
                _context.n = 18;
                break;
              case 14:
                _context.p = 14;
                _t = _context.v;
                _didIteratorError = true;
                _iteratorError = _t;
              case 18:
                _context.p = 18;
                _context.p = 19;
                if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                  _context.n = 23;
                  break;
                }
                _context.n = 23;
                return _awaitAsyncGenerator(_iterator.return());
              case 23:
                _context.p = 23;
                if (!_didIteratorError) {
                  _context.n = 26;
                  break;
                }
                throw _iteratorError;
              case 26:
                return _context.f(23);
              case 27:
                return _context.f(18);
              case 28:
                return _context.a(2);
            }
          }, null, null, [[19,, 23, 27], [2, 14, 18, 28]], Promise);
        };
        one = 1; // array destructuring: required for babel to crash
      case 2:
        return _context2.a(2);
    }
  }, null, null, null, Promise);
}
