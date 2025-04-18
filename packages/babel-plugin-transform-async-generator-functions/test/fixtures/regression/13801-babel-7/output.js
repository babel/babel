function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function r(n, o, i, f) { var a = _tryCatch(t[n], t, o); if (!a.e) { var c = a.v, u = c.value; return u && u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { r("next", t, i, f); }, function (t) { r("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return r("throw", t, i, f); }); } f(a.v); } var n; this.next || (_regeneratorDefineIM(_regeneratorAsyncIterator.prototype), _regeneratorDefine(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine(this, "_invoke", function (t, o) { function i() { return new e(function (e, n) { r(t, o, e, n); }); } return n = n ? n.then(i, i) : i(); }, !0); }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _regenerator() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var t, e = Object.prototype, r = e.hasOwnProperty, n = "function" == typeof Symbol ? Symbol : {}, o = n.iterator || "@@iterator", i = n.toStringTag || "@@toStringTag"; function a(e, r, n, o) { var i = r && r.prototype instanceof Generator ? r : Generator, a = Object.create(i.prototype), u = new Context(o || []); return _regeneratorDefine(a, "_invoke", function (e, r, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var s = d(u, n); if (s) { if (s === h) continue; return s; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var c = _tryCatch(e, r, n); if (!c.e) { if (o = n.done ? 4 : 2, c.v === h) continue; return { value: c.v, done: n.done }; } o = 4, n.method = "throw", n.arg = c.v; } }; }(e, n, u), !0), a; } var h = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var u = {}; _regeneratorDefine(u, o, function () { return this; }); var s = Object.getPrototypeOf, c = s && s(s(_regeneratorValues([]))); c && c !== e && r.call(c, o) && (u = c); var f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(t, i, "GeneratorFunction")), t.prototype = Object.create(f), t; } function d(e, r) { var n = r.method, o = e.i[n]; if (o === t) return r.delegate = null, "throw" === n && e.i.return && (r.method = "return", r.arg = t, d(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), h; var i = _tryCatch(o, e.i, r.arg); if (i.e) return r.method = "throw", r.arg = i.v, r.delegate = null, h; var a = i.v; return a ? a.done ? (r[e.r] = a.value, r.next = e.n, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, h) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, h); } function l(e) { var r = e[4] || {}; r.type = "normal", r.arg = t, e[4] = r; } function Context(t) { this.tryEntries = [[-1]].concat(t), this.reset(!0); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = _regeneratorDefine(GeneratorFunctionPrototype, i, "GeneratorFunction"), _regeneratorDefineIM(f), _regeneratorDefine(f, i, "Generator"), _regeneratorDefine(f, o, function () { return this; }), _regeneratorDefine(f, "toString", function () { return "[object Generator]"; }), Context.prototype = { constructor: Context, reset: function (e) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(l), !e) for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t); }, stop: function () { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function (e) { if (this.done) throw e; var r = this; function n(t) { a.type = "throw", a.arg = e, r.next = t; } for (var o = r.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], h = this.prev, u = i[1], s = i[2]; if (-1 === i[0]) return n("end"), !1; if (!u && !s) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= h) { if (h < u) return this.method = "next", this.arg = t, n(u), !0; if (h < s) return n(s), !1; } } }, abrupt: function (t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var n = this.tryEntries[r]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= e && e <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o[2], h) : this.complete(i); }, complete: function (t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), h; }, finish: function (t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r[2] === t) return this.complete(r[4], r[3]), l(r), h; } }, catch: function (t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r[0] === t) { var n = r[4]; if ("throw" === n.type) { var o = n.arg; l(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function (e, r, n) { return this.delegate = { i: _regeneratorValues(e), r: r, n: n }, "next" === this.method && (this.arg = t), h; } }, (_regenerator = function () { return { w: a, m: p }; })(); }
function _tryCatch(t, r, e) { try { return { e: 0, v: t.call(r, e) }; } catch (t) { return { e: 1, v: t }; } }
function _regeneratorValues(e) { if (null != e) { var r = e["function" == typeof Symbol && Symbol.iterator || "@iterator"]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var t = -1, n = function r() { for (; ++t < e.length;) if ({}.hasOwnProperty.call(e, t)) return r.value = e[t], r.done = !1, r; return r.value = void 0, r.done = !0, r; }; return n.next = n; } } throw new TypeError(typeof e + " is not iterable"); }
function _regeneratorDefineIM(e) { function n(n) { _regeneratorDefine(e, n, function (e) { return this._invoke(n, e); }); } n("next"), n("throw"), n("return"); }
function _regeneratorDefine(e, r, n, t) { _regeneratorDefine = function (e, r, n, t) { return Object.defineProperty(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }); }; try { _regeneratorDefine({}, ""); } catch (e) { _regeneratorDefine = function (e, r, n) { return e[r] = n; }; } return _regeneratorDefine(e, r, n, t); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function (r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function () { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function (r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function (r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
function main() {
  var one;
  return _regeneratorAsync(function main$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        () => {
          var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, string;
          return _regeneratorAsync(function _callee$(_context) {
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
                _context.t0 = _context["catch"](2);
                _didIteratorError = true;
                _iteratorError = _context.t0;
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
              case "end":
                return _context.stop();
            }
          }, null, null, [[2, 14, 18, 28], [19,, 23, 27]], Promise);
        };
        one = 1; // array destructuring: required for babel to crash
      case 2:
      case "end":
        return _context2.stop();
    }
  }, null, null, null, Promise);
}
