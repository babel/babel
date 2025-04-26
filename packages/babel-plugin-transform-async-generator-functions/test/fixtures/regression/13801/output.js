function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag", u = ["next", "throw", "return"]; function c(r, n, o, i) { var a = n && n.prototype instanceof Generator ? n : Generator, c = Object.create(a.prototype); return _regeneratorDefine(c, "_invoke", function (r, n, o) { var i, a, c, p = 0, y = o || [], d = !1, l = { prev: 0, next: 0, sent: e, abrupt: s, finish: s.bind(e, 4), delegateYield: (t, r) => (i = _regeneratorValues(t), a = 0, c = e, l.next = r, f) }; function s(r, n) { for (a = r, c = n, t = 0; !d && p && !o && t < y.length; t++) { var o, i = y[t], u = l.prev, s = i[2]; r > 3 ? (o = s === n) && (a = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= u && ((o = r < 2 && u < i[1]) ? (a = 0, l.sent = n, l.next = i[1]) : u < s && (o = r < 3 || i[0] > n || n > s) && (i[4] = r, i[5] = n, l.next = s, a = 0)); } if (o || r > 1) return f; throw d = !0, n; } return function (o, y, G) { if (2 === p) throw Error("Generator is already running"); for (d && 1 === y && s(y, G), a = y, c = G; !d || (t = e);) { i || (a ? a < 3 ? (a > 1 && (l.next = -1), s(a, c)) : l.next = c : l.sent = c); try { if (i) { if (t = i[u[a]]) { if (t = t.call(i, c)) { if (!t) throw TypeError("iterator result is not an object"); if (!t.done) return t; c = t.value, a < 2 && (a = 0); } } else a && (t = i[u[2]]) && t.call(i), a < 2 && (c = TypeError("The iterator does not provide a '" + u[a] + "' method"), a = 1); i = e; } else if (p = 2, t = (d = l.next < 0) ? c : r.call(n, l), p = d ? 3 : 1, t !== f) break; } catch (t) { p = 3, i = e, a = 1, c = t; } } return { value: t, done: d }; }; }(r, o, i), !0), c; } var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; _regeneratorDefine(p, i, function () { return this; }); var y = Object.getPrototypeOf, d = y && y(y(_regeneratorValues([]))); d && d !== r && n.call(d, i) && (p = d); var l = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function s(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = Object.create(l), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(l, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = _regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefineIM(l), _regeneratorDefine(l, a, "Generator"), _regeneratorDefine(l, i, function () { return this; }), _regeneratorDefine(l, "toString", function () { return "[object Generator]"; }), (_regenerator = function () { return { w: c, m: s }; })(); }
function _regeneratorValues(e) { if (null != e) { var r = e["function" == typeof Symbol && Symbol.iterator || "@iterator"]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var t = -1, n = function r() { for (; ++t < e.length;) if ({}.hasOwnProperty.call(e, t)) return r.value = e[t], r.done = !1, r; return r.value = void 0, r.done = !0, r; }; return n.next = n; } } throw new TypeError(typeof e + " is not iterable"); }
function _regeneratorAsyncIterator(t, e) { function r(n, o, i, f) { var a = _tryCatch(t[n], t, o); if (!a.e) { var c = a.v, u = c.value; return u && u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { r("next", t, i, f); }, function (t) { r("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return r("throw", t, i, f); }); } f(a.v); } var n; this.next || (_regeneratorDefineIM(_regeneratorAsyncIterator.prototype), _regeneratorDefine(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, n) { r(t, i, e, n); }); } return n = n ? n.then(f, f) : f(); }, !0); }
function _regeneratorDefineIM(e) { function n(n, t) { _regeneratorDefine(e, n, function (e) { return this._invoke(n, t, e); }); } n("next", 0), n("throw", 1), n("return", 2); }
function _tryCatch(t, r, e) { try { return { e: 0, v: t.call(r, e) }; } catch (t) { return { e: 1, v: t }; } }
function _regeneratorDefine(e, r, n, t) { _regeneratorDefine = function (e, r, n, t) { return Object.defineProperty(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }); }; try { _regeneratorDefine({}, ""); } catch (e) { _regeneratorDefine = function (e, r, n) { return e[r] = n; }; } return _regeneratorDefine(e, r, n, t); }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
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
                return _context.abrupt(2);
            }
          }, null, null, [[19,, 23, 27], [2, 14, 18, 28]], Promise);
        };
        one = 1; // array destructuring: required for babel to crash
      case 2:
        return _context2.abrupt(2);
    }
  }, null, null, null, Promise);
}
