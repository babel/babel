function _regeneratorAsync(r, e, n, t, o) { null == o && (o = Promise); var a = _regeneratorRuntime(), u = new _regeneratorAsyncIterator(a.wrap(r, e, n, t), o); return a.isGeneratorFunction(e) ? u : u.next().then(function (r) { return r.done ? r.value : u.next(); }); }
function _regeneratorAsyncIterator(t, e) { var n, o = _regeneratorRuntime(); function invoke(n, r, i, a) { var u = o._t(t[n], t, r); if ("throw" !== u.type) { var c = u.arg, l = c.value; return l && l instanceof _OverloadYield ? e.resolve(l.v).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(l).then(function (t) { c.value = t, i(c); }, function (t) { return invoke("throw", t, i, a); }); } a(u.arg); } this.next || (o._m(_regeneratorAsyncIterator.prototype), o._d(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), o._d(this, "_invoke", function (t, o) { function callInvokeWithMethodAndArg() { return new e(function (e, n) { invoke(t, o, e, n); }); } return n = n ? n.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }, !0); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function () { return r; }; var t, r = { keys: _regeneratorKeys, awrap: _awaitAsyncGenerator, async: _regeneratorAsync, AsyncIterator: _regeneratorAsyncIterator, _t: c, _d: u, _m: l }, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function u(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { u({}, ""); } catch (t) { u = function (t, r, e) { return t[r] = e; }; } function c(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = function (r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return u(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var s = g(u, n); if (s) { if (s === h) continue; return s; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var f = c(r, e, n); if ("normal" === f.type) { if (o = n.done ? 4 : 2, f.arg === h) continue; return { value: f.arg, done: n.done }; } "throw" === f.type && (o = 4, n.method = "throw", n.arg = f.arg); } }; }(r, n, new Context(o || [])), !0), a; }; var h = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var s = {}; u(s, i, function () { return this; }); var f = Object.getPrototypeOf, y = f && f(f(m([]))); y && y !== e && n.call(y, i) && (s = y); var p = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(s); function l(t) { ["next", "throw", "return"].forEach(function (r) { u(t, r, function (t) { return this._invoke(r, t); }); }); } function g(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, g(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), h; var i = c(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, h; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, h) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, h); } function d(t) { this.tryEntries.push(t); } function v(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(d, this), this.reset(!0); } function m(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(typeof r + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, u(p, "constructor", GeneratorFunctionPrototype), u(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = u(GeneratorFunctionPrototype, a, "GeneratorFunction"), r.defineIteratorMethods = l, r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, u(t, a, "GeneratorFunction")), t.prototype = Object.create(p), t; }, l(p), u(p, a, "Generator"), u(p, i, function () { return this; }), u(p, "toString", function () { return "[object Generator]"; }), r.values = m, Context.prototype = { constructor: Context, reset: function (r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(v), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function () { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function (r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function (t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], h) : this.complete(i); }, complete: function (t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), h; }, finish: function (t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), v(e), h; } }, catch: function (t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; v(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function (r, e, n) { return this.delegate = { i: m(r), r: e, n: n }, "next" === this.method && (this.arg = t), h; } }, r; }
function _regeneratorKeys(e) { var n = Object(e), t = []; for (var r in n) t.unshift(r); return function next() { for (; t.length;) if ((r = t.pop()) in n) return next.value = r, next.done = !1, next; return next.done = !0, next; }; }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
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
