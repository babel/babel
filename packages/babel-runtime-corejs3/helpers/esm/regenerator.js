import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _concatInstanceProperty from "core-js-pure/features/instance/concat.js";
import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import regeneratorDefine from "./regeneratorDefine.js";
import regeneratorDefineIM from "./regeneratorDefineIM.js";
import regeneratorValues from "./regeneratorValues.js";
import tryCatch from "./tryCatch.js";
function _regenerator() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var r,
    t = Object.prototype,
    e = t.hasOwnProperty,
    n = "function" == typeof _Symbol ? _Symbol : {},
    o = n.iterator || "@@iterator",
    i = n.toStringTag || "@@toStringTag",
    a = ["next", "throw", "return"];
  function u(t, e, n, o) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      u = _Object$create(i.prototype);
    return regeneratorDefine(u, "_invoke", function (t, e, n, _context) {
      var o = 1;
      function i(t) {
        var e = l,
          n = t.i[a[e]];
        if (n === r) return y = null, 1 === e && t.i["return"] && (l = 2, s = r, i(t), 1 === l) || 2 !== e && (l = 1, s = new TypeError("The iterator does not provide a '" + a[e] + "' method")), f;
        var o = tryCatch(n, t.i, s);
        if (o.e) return l = 1, s = o.v, y = null, f;
        var u = o.v;
        return u ? u.done ? (d[t.r] = u.value, d.next = t.n, 2 !== l && (l = 0, s = r), y = null, f) : u : (l = 1, s = new TypeError("iterator result is not an object"), y = null, f);
      }
      function u(t) {
        var e = t[4] || {};
        e.type = 0, e.arg = r, t[4] = e;
      }
      var c,
        p = _concatInstanceProperty(_context = [[-1]]).call(_context, n || []),
        v = !1,
        y = null,
        l = 0,
        s = r;
      _forEachInstanceProperty(p).call(p, u);
      var d = {
        prev: 0,
        next: 0,
        sent: r,
        stop: g,
        abrupt: G,
        finish: function finish(r) {
          for (var t = p.length - 1; t >= 0; --t) {
            var e = p[t];
            if (e[2] === r) return F(e[4], e[3]), u(e), f;
          }
        },
        "catch": function _catch(r) {
          for (var t = p.length - 1; t >= 0; --t) {
            var e = p[t];
            if (e[0] === r) {
              var n = e[4];
              if (1 === n.type) {
                var o = n.arg;
                u(e);
              }
              return o;
            }
          }
        },
        delegateYield: function delegateYield(t, e, n) {
          return y = {
            i: regeneratorValues(t),
            r: e,
            n: n
          }, 0 === l && (s = r), f;
        }
      };
      function g() {
        v = !0;
        var r = p[0][4];
        if (1 === r.type) throw r.arg;
        return c;
      }
      function h(t) {
        if (v) throw t;
        function e(r) {
          i.type = 1, i.arg = t, d.next = r;
        }
        for (var n = p.length - 1; n >= 0; --n) {
          var o = p[n],
            i = o[4],
            a = d.prev,
            u = o[1],
            f = o[2];
          if (-1 === o[0]) return e(-1), !1;
          if (null != o[0] && o[0] <= a) {
            if (a < u) return l = 0, s = r, e(u), !0;
            if (a < f) return e(f), !1;
          }
        }
      }
      function G(r, t) {
        for (var e = p.length - 1; e >= 0; --e) {
          var n = p[e];
          if (n[0] > -1 && n[0] <= d.prev && d.prev < n[2]) {
            var o = n;
            break;
          }
        }
        o && (2 === r || 3 === r) && o[0] <= t && t <= o[2] && (o = null);
        var i = o ? o[4] : {};
        return i.type = r, i.arg = t, o ? (l = 0, d.next = o[2], f) : F(i);
      }
      function F(r, t) {
        if (1 === r.type) throw r.arg;
        return 2 === r.type || 3 === r.type ? d.next = r.arg : 4 === r.type ? (c = s = r.arg, l = 2, d.next = -1) : 0 === r.type && t && (d.next = t), f;
      }
      return function (n, u) {
        if (n = _indexOfInstanceProperty(a).call(a, n), 3 === o) throw Error("Generator is already running");
        if (4 === o) {
          if (1 === n) throw u;
          return {
            value: r,
            done: !0
          };
        }
        for (l = n, s = u;;) {
          if (y) {
            var c = i(y);
            if (c) {
              if (c === f) continue;
              return c;
            }
          }
          if (0 === l) d.sent = s;else if (1 === l) {
            if (1 === o) throw o = 4, s;
            h(s);
          } else 2 === l && G(4, s);
          o = 3;
          var p = tryCatch(-1 === d.next ? g : t, e, d);
          if (!p.e) {
            if (o = v ? 4 : 2, p.v === f) continue;
            return {
              value: p.v,
              done: v
            };
          }
          o = 4, l = 1, s = p.v;
        }
      };
    }(t, n, o), !0), u;
  }
  var f = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var c = {};
  regeneratorDefine(c, o, function () {
    return this;
  });
  var p = _Object$getPrototypeOf,
    v = p && p(p(regeneratorValues([])));
  v && v !== t && e.call(v, o) && (c = v);
  var y = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(c);
  function l(r) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(r, i, "GeneratorFunction")), r.prototype = _Object$create(y), r;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(y, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = regeneratorDefine(GeneratorFunctionPrototype, i, "GeneratorFunction"), regeneratorDefineIM(y), regeneratorDefine(y, i, "Generator"), regeneratorDefine(y, o, function () {
    return this;
  }), regeneratorDefine(y, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: u,
      m: l
    };
  })();
}
export { _regenerator as default };