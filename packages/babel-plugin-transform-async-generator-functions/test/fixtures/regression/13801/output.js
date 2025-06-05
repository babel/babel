function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine(_regeneratorAsyncIterator.prototype), _regeneratorDefine(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function (t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () { return this; }), _regeneratorDefine(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function () { return { w: i, m: f }; })(); }
function _regeneratorDefine(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine = function (e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine(e, r, n, t); }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
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
