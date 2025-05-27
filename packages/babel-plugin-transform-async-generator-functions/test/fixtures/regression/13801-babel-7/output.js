function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine(_regeneratorAsyncIterator.prototype), _regeneratorDefine(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var u = n && n.prototype instanceof Generator ? n : Generator, c = Object.create(u.prototype); return _regeneratorDefine(c, "_invoke", function (r, n, o) { var i, u, c, f = 0, p = o || [], y = !1, l = { p: 0, n: 0, v: e, a: G, f: G.bind(e, 4), d: function (t, r) { return i = _regeneratorValues(t), u = 0, c = e, l.n = r, a; } }; function G(r, n) { for (u = r, c = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], G = l.p, d = i[2]; r > 3 ? (o = d === n) && (u = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= G && ((o = r < 2 && G < i[1]) ? (u = 0, l.v = n, l.n = i[1]) : G < d && (o = r < 3 || i[0] > n || n > d) && (i[4] = r, i[5] = n, l.n = d, u = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, d) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && G(p, d), u = p, c = d; (t = u < 2 ? e : c) || !y;) { i || (u ? u < 3 ? (u > 1 && (l.n = -1), G(u, c)) : l.n = c : l.v = c); try { if (f = 2, i) { if (u || (o = "next"), t = i[o]) { if (!(t = t.call(i, c))) throw TypeError("iterator result is not an object"); if (!t.done) return t; c = t.value, u < 2 && (u = 0); } else 1 === u && (t = i.return) && t.call(i), u < 2 && (c = TypeError("The iterator does not provide a '" + o + "' method"), u = 1); i = e; } else if ((t = (y = l.n < 0) ? c : r.call(n, l)) !== a) break; } catch (t) { i = e, u = 1, c = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), c; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var u = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () { return this; }), t), c = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(c), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(c, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(c), _regeneratorDefine(c, o, "Generator"), _regeneratorDefine(c, n, function () { return this; }), _regeneratorDefine(c, "toString", function () { return "[object Generator]"; }), (_regenerator = function () { return { w: i, m: f }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function () { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(typeof e + " is not iterable"); }
function _regeneratorDefine(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine = function (e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine(e, r, n, t); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function (r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function () { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function (r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function (r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
function main() {
  var one;
  return _regeneratorAsync(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        () => {
          var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, string, _t;
          return _regeneratorAsync(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                // IIFE: required for babel to crash
                _iteratorAbruptCompletion = false;
                _didIteratorError = false;
                _context.p = 1;
                _iterator = _asyncIterator(async_iterable);
              case 2:
                _context.n = 3;
                return _awaitAsyncGenerator(_iterator.next());
              case 3:
                if (!(_iteratorAbruptCompletion = !(_step = _context.v).done)) {
                  _context.n = 5;
                  break;
                }
                string = _step.value;
                // for await: required for babel to crash
                console.log(string);
              case 4:
                _iteratorAbruptCompletion = false;
                _context.n = 2;
                break;
              case 5:
                _context.n = 7;
                break;
              case 6:
                _context.p = 6;
                _t = _context.v;
                _didIteratorError = true;
                _iteratorError = _t;
              case 7:
                _context.p = 7;
                _context.p = 8;
                if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                  _context.n = 9;
                  break;
                }
                _context.n = 9;
                return _awaitAsyncGenerator(_iterator.return());
              case 9:
                _context.p = 9;
                if (!_didIteratorError) {
                  _context.n = 10;
                  break;
                }
                throw _iteratorError;
              case 10:
                return _context.f(9);
              case 11:
                return _context.f(7);
              case 12:
                return _context.a(2);
            }
          }, null, null, [[8,, 9, 11], [1, 6, 7, 12]], Promise);
        };
        one = 1; // array destructuring: required for babel to crash
      case 1:
        return _context2.a(2);
    }
  }, null, null, null, Promise);
}
