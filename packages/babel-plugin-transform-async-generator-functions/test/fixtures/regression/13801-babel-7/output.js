function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function r(n, o, i, f) { var a = _tryCatch(t[n], t, o); if (!a.e) { var c = a.v, u = c.value; return u && u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { r("next", t, i, f); }, function (t) { r("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return r("throw", t, i, f); }); } f(a.v); } var n; this.next || (_regeneratorDefineIM(_regeneratorAsyncIterator.prototype), _regeneratorDefine(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, n) { r(t, i, e, n); }); } return n = n ? n.then(f, f) : f(); }, !0); }
function _tryCatch(t, r, e) { try { return { e: 0, v: t.call(r, e) }; } catch (t) { return { e: 1, v: t }; } }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _regenerator() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag", u = ["next", "throw", "return"]; function c(r, n, o, i) { var a = n && n.prototype instanceof Generator ? n : Generator, c = Object.create(a.prototype); return _regeneratorDefine(c, "_invoke", function (r, n, o) { var i, a, c, p = 1, s = o || [], y = !1, d = 0, l = { prev: 0, next: 0, sent: e, stop: G, abrupt: v, finish: v.bind(e, 4), delegateYield: function (t, r) { return a = _regeneratorValues(t), c = e, l.next = r, f; } }; function G() { return y = !0, i; } function v(t, r) { d = t, c = r; for (var n = s.length - 1; !y && 1 !== p && n >= 0; --n) { var o, i = s[n], a = l.prev, u = i[0], G = i[1], v = i[2]; if (4 === t ? (o = v === r) && (d = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : u <= a && ((o = 1 === t && a < G) ? (d = 0, l.sent = r, l.next = G) : a < v && (o = 1 === t || !(3 === t && u <= r && r <= v)) && (i[4] = t, i[5] = r, l.next = v, d = 0)), o) break; } if (o || 1 !== t) return f; throw p = 4, r; } return function (o, s, h) { if (3 === p) throw Error("Generator is already running"); if (4 === p) { if (1 === s) throw h; return { value: e, done: !0 }; } for (d = s, c = h;;) { a || (0 === d ? l.sent = c : 1 === d ? v(1, c) : 2 === d ? (i = c, l.next = -1, v(2, c)) : l.next = c); try { if (a) { if (t = a[u[d]]) { if (t = t.call(a, c)) { if (!t) throw TypeError("iterator result is not an object"); if (!t.done) return t; 2 !== d && (d = 0, c = t.value); } } else 1 === d && (t = a.return) && t.call(a), 2 !== d && (c = TypeError("The iterator does not provide a '" + u[d = 1] + "' method")); a = e; } else if (p = 3, t = (-1 === l.next ? G : r).call(n, l), p = y ? 4 : 2, t !== f) return { value: t, done: y }; } catch (t) { p = 4, a = e, d = 1, c = t; } } }; }(r, o, i), !0), c; } var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; _regeneratorDefine(p, i, function () { return this; }); var s = Object.getPrototypeOf, y = s && s(s(_regeneratorValues([]))); y && y !== r && n.call(y, i) && (p = y); var d = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function l(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = Object.create(d), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(d, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = _regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefineIM(d), _regeneratorDefine(d, a, "Generator"), _regeneratorDefine(d, i, function () { return this; }), _regeneratorDefine(d, "toString", function () { return "[object Generator]"; }), (_regenerator = function () { return { w: c, m: l }; })(); }
function _regeneratorValues(e) { if (null != e) { var r = e["function" == typeof Symbol && Symbol.iterator || "@iterator"]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var t = -1, n = function r() { for (; ++t < e.length;) if ({}.hasOwnProperty.call(e, t)) return r.value = e[t], r.done = !1, r; return r.value = void 0, r.done = !0, r; }; return n.next = n; } } throw new TypeError(typeof e + " is not iterable"); }
function _regeneratorDefineIM(e) { function n(n, t) { _regeneratorDefine(e, n, function (e) { return this._invoke(n, t, e); }); } n("next", 0), n("throw", 1), n("return", 2); }
function _regeneratorDefine(e, r, n, t) { _regeneratorDefine = function (e, r, n, t) { return Object.defineProperty(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }); }; try { _regeneratorDefine({}, ""); } catch (e) { _regeneratorDefine = function (e, r, n) { return e[r] = n; }; } return _regeneratorDefine(e, r, n, t); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function (r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function () { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function (r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function (r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
function main() {
  var one;
  return _regeneratorAsync(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        () => {
          var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, string, _t;
          return _regeneratorAsync(function (_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                // IIFE: required for babel to crash
                _iteratorAbruptCompletion = false;
                _didIteratorError = false;
                _context.prev = 2;
                _iterator = _asyncIterator(async_iterable);
              case 4:
                _context.next = 6;
                return _awaitAsyncGenerator(_iterator.next());
              case 6:
                if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
                  _context.next = 12;
                  break;
                }
                string = _step.value;
                // for await: required for babel to crash
                console.log(string);
              case 9:
                _iteratorAbruptCompletion = false;
                _context.next = 4;
                break;
              case 12:
                _context.next = 18;
                break;
              case 14:
                _context.prev = 14;
                _t = _context.sent;
                _didIteratorError = true;
                _iteratorError = _t;
              case 18:
                _context.prev = 18;
                _context.prev = 19;
                if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                  _context.next = 23;
                  break;
                }
                _context.next = 23;
                return _awaitAsyncGenerator(_iterator.return());
              case 23:
                _context.prev = 23;
                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }
                throw _iteratorError;
              case 26:
                return _context.finish(23);
              case 27:
                return _context.finish(18);
              case 28:
                return _context.stop();
            }
          }, null, null, [[2, 14, 18, 28], [19,, 23, 27]], Promise);
        };
        one = 1; // array destructuring: required for babel to crash
      case 2:
        return _context2.stop();
    }
  }, null, null, null, Promise);
}
