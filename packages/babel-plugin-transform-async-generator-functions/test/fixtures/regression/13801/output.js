function _regeneratorAsync(n, r, t, o, u) { var a = _regeneratorAsyncGen(n, r, t, o, u); return a.next().then(function (e) { return e.done ? e.value : a.next(); }); }
function _regeneratorAsyncGen(o, t, n, a, m) { return new _regeneratorAsyncIterator(_regenerator().w(o, t, n, a), m || Promise); }
function _regeneratorAsyncIterator(r, e) { function o(n, i, c, u) { try { var f = r[n](i), a = f.value; return a instanceof _OverloadYield ? e.resolve(a.v).then(function (t) { o("next", t, c, u); }, function (t) { o("throw", t, c, u); }) : e.resolve(a).then(function (t) { f.value = t, c(f); }, function (t) { return o("throw", t, c, u); }); } catch (t) { u(t); } } var i; this.next || (_regeneratorDefine(_regeneratorAsyncIterator.prototype), _regeneratorDefine(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine(this, "_invoke", function (t, n, r) { function c() { return new e(function (n, e) { o(t, r, n, e); }); } return i = i ? i.then(c, c) : c(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function (t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? i < 3 ? (i > 1 && (G.n = -1), l(i, u)) : G.n = u : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine(f), _regeneratorDefine(f, a, "Generator"), _regeneratorDefine(f, n, function () { return this; }), _regeneratorDefine(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function () { return { w: i, m: p }; })(); }
function _regeneratorDefine(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine = function (e, r, n, t) { function o(r, n) { _regeneratorDefine(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine(e, r, n, t); }
function _awaitAsyncGenerator(r) { return new _OverloadYield(r, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function (r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function () { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function (r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function (r) { var n = this.s.throw; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
function main() {
  var one;
  return _regeneratorAsync(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        () => {
          var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, string, _t;
          return _regeneratorAsync(function (_context) {
            while (1) switch (_context.p = _context.n) {
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
