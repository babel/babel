function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function r(n, o, i, f) { var a = _tryCatch(t[n], t, o); if (!a.e) { var c = a.v, u = c.value; return u && u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { r("next", t, i, f); }, function (t) { r("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return r("throw", t, i, f); }); } f(a.v); } var n; this.next || (_regeneratorDefineIM(_regeneratorAsyncIterator.prototype), _regeneratorDefine(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine(this, "_invoke", function (t, o) { function i() { return new e(function (e, n) { r(t, o, e, n); }); } return n = n ? n.then(i, i) : i(); }, !0); }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _regenerator() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, t = Object.prototype, e = t.hasOwnProperty, n = "function" == typeof Symbol ? Symbol : {}, o = n.iterator || "@@iterator", i = n.toStringTag || "@@toStringTag", a = ["next", "throw", "return"]; function u(t, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, u = Object.create(i.prototype); return _regeneratorDefine(u, "_invoke", function (t, e, n) { var o = 1; function i(t) { var e = l, n = t.i[a[e]]; if (n === r) return y = null, 1 === e && t.i.return && (l = 2, s = r, i(t), 1 === l) || 2 !== e && (l = 1, s = new TypeError("The iterator does not provide a '" + a[e] + "' method")), f; var o = _tryCatch(n, t.i, s); if (o.e) return l = 1, s = o.v, y = null, f; var u = o.v; return u ? u.done ? (d[t.r] = u.value, d.next = t.n, 2 !== l && (l = 0, s = r), y = null, f) : u : (l = 1, s = new TypeError("iterator result is not an object"), y = null, f); } function u(t) { var e = t[4] || {}; e.type = 0, e.arg = r, t[4] = e; } var c, p = [[-1]].concat(n || []), v = !1, y = null, l = 0, s = r; p.forEach(u); var d = { prev: 0, next: 0, sent: r, stop: g, abrupt: G, finish: function (r) { for (var t = p.length - 1; t >= 0; --t) { var e = p[t]; if (e[2] === r) return F(e[4], e[3]), u(e), f; } }, catch: function (r) { for (var t = p.length - 1; t >= 0; --t) { var e = p[t]; if (e[0] === r) { var n = e[4]; if (1 === n.type) { var o = n.arg; u(e); } return o; } } }, delegateYield: function (t, e, n) { return y = { i: _regeneratorValues(t), r: e, n: n }, 0 === l && (s = r), f; } }; function g() { v = !0; var r = p[0][4]; if (1 === r.type) throw r.arg; return c; } function h(t) { if (v) throw t; function e(r) { i.type = 1, i.arg = t, d.next = r; } for (var n = p.length - 1; n >= 0; --n) { var o = p[n], i = o[4], a = d.prev, u = o[1], f = o[2]; if (-1 === o[0]) return e(-1), !1; if (null != o[0] && o[0] <= a) { if (a < u) return l = 0, s = r, e(u), !0; if (a < f) return e(f), !1; } } } function G(r, t) { for (var e = p.length - 1; e >= 0; --e) { var n = p[e]; if (n[0] > -1 && n[0] <= d.prev && d.prev < n[2]) { var o = n; break; } } o && (2 === r || 3 === r) && o[0] <= t && t <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = r, i.arg = t, o ? (l = 0, d.next = o[2], f) : F(i); } function F(r, t) { if (1 === r.type) throw r.arg; return 2 === r.type || 3 === r.type ? d.next = r.arg : 4 === r.type ? (c = s = r.arg, l = 2, d.next = -1) : 0 === r.type && t && (d.next = t), f; } return function (n, u) { if (n = a.indexOf(n), 3 === o) throw Error("Generator is already running"); if (4 === o) { if (1 === n) throw u; return { value: r, done: !0 }; } for (l = n, s = u;;) { if (y) { var c = i(y); if (c) { if (c === f) continue; return c; } } if (0 === l) d.sent = s;else if (1 === l) { if (1 === o) throw o = 4, s; h(s); } else 2 === l && G(4, s); o = 3; var p = _tryCatch(-1 === d.next ? g : t, e, d); if (!p.e) { if (o = v ? 4 : 2, p.v === f) continue; return { value: p.v, done: v }; } o = 4, l = 1, s = p.v; } }; }(t, n, o), !0), u; } var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var c = {}; _regeneratorDefine(c, o, function () { return this; }); var p = Object.getPrototypeOf, v = p && p(p(_regeneratorValues([]))); v && v !== t && e.call(v, o) && (c = v); var y = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function l(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(r, i, "GeneratorFunction")), r.prototype = Object.create(y), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(y, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = _regeneratorDefine(GeneratorFunctionPrototype, i, "GeneratorFunction"), _regeneratorDefineIM(y), _regeneratorDefine(y, i, "Generator"), _regeneratorDefine(y, o, function () { return this; }), _regeneratorDefine(y, "toString", function () { return "[object Generator]"; }), (_regenerator = function () { return { w: u, m: l }; })(); }
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
