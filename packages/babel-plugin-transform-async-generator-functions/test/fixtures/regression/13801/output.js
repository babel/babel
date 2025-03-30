function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function () { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function define(t, e, r, n) { return Object.defineProperty(t, e, { value: r, enumerable: !n, configurable: !n, writable: !n }); } try { define({}, ""); } catch (t) { define = function (t, e, r) { return t[e] = r; }; } function wrap(e, r, n, o) { var i = r && r.prototype instanceof Generator ? r : Generator, a = Object.create(i.prototype); return define(a, "_invoke", function (e, r, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = maybeInvokeDelegate(u, n); if (c) { if (c === h) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var f = tryCatch(e, r, n); if ("normal" === f.type) { if (o = n.done ? 4 : 2, f.arg === h) continue; return { value: f.arg, done: n.done }; } "throw" === f.type && (o = 4, n.method = "throw", n.arg = f.arg); } }; }(e, n, new Context(o || [])), !0), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var c = {}; define(c, i, function () { return this; }); var f = Object.getPrototypeOf, s = f && f(f(values([]))); s && s !== r && n.call(s, i) && (c = s); var l = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var u = tryCatch(t[r], t, o); if ("throw" !== u.type) { var h = u.arg, c = h.value; return c && "object" == typeof c && n.call(c, "__await") ? e.resolve(c.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(c).then(function (t) { h.value = t, i(h); }, function (t) { return invoke("throw", t, i, a); }); } a(u.arg); } var r; define(this, "_invoke", function (t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }, !0); } function maybeInvokeDelegate(e, r) { var n = r.method, o = e[0][n]; if (o === t) return r.delegate = null, "throw" === n && e[0].return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), h; var i = tryCatch(o, e[0], r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, h; var a = i.arg; return a ? a.done ? (r[e[1]] = a.value, r.next = e[2], "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, h) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, h); } function pushTryEntry(t) { this.tryEntries.push(t); } function resetTryEntry(e) { var r = e[4] || {}; r.type = "normal", r.arg = t, e[4] = r; } function Context(t) { this.tryEntries = [[-1]], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (null != e) { var r = e[i]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, a = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return a.next = a; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(l, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === e.name); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(l), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, a, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(l), define(l, u, "Generator"), define(l, i, function () { return this; }), define(l, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.unshift(n); return function next() { for (; r.length;) if ((n = r.pop()) in e) return next.value = n, next.done = !1, next; return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function (e) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function () { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function (e) { if (this.done) throw e; var r = this; function handle(t) { i.type = "throw", i.arg = e, r.next = t; } for (var n = r.tryEntries.length - 1; n >= 0; --n) { var o = this.tryEntries[n], i = o[4], a = this.prev, u = o[1], h = o[2]; if (-1 === o[0]) return handle("end"), !1; if (!u && !h) throw Error("try statement without catch or finally"); if (null != o[0] && o[0] <= a) { if (a < u) return this.method = "next", this.arg = t, handle(u), !0; if (a < h) return handle(h), !1; } } }, abrupt: function (t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var n = this.tryEntries[r]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= e && e <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o[2], h) : this.complete(i); }, complete: function (t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), h; }, finish: function (t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r[2] === t) return this.complete(r[4], r[3]), resetTryEntry(r), h; } }, catch: function (t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r[0] === t) { var n = r[4]; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function (e, r, n) { return this.delegate = [values(e), r, n], "next" === this.method && (this.arg = t), h; } }, e; }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function (r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function () { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function (r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function (r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
function main() {
  var one;
  return _regeneratorRuntime().async(function main$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        () => {
          var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, string;
          return _regeneratorRuntime().async(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                // IIFE: required for babel to crash
                _iteratorAbruptCompletion = false;
                _didIteratorError = false;
                _context.prev = 2;
                _iterator = _asyncIterator(async_iterable);
              case 4:
                _context.next = 6;
                return _regeneratorRuntime().awrap(_iterator.next());
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
                return _regeneratorRuntime().awrap(_iterator.return());
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
