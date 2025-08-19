import _typeof from "./typeof.js";
import _Symbol$metadata from "core-js-pure/features/symbol/metadata.js";
import _Symbol$for from "core-js-pure/features/symbol/for.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _concatInstanceProperty from "core-js-pure/features/instance/concat.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _unshiftInstanceProperty from "core-js-pure/features/instance/unshift.js";
import _spliceInstanceProperty from "core-js-pure/features/instance/splice.js";
import checkInRHS from "./checkInRHS.js";
import setFunctionName from "./setFunctionName.js";
import toPropertyKey from "./toPropertyKey.js";
function applyDecs2311(e, t, n, r, o, i) {
  var a,
    c,
    u,
    s,
    f,
    l,
    p,
    d = _Symbol$metadata || _Symbol$for("Symbol.metadata"),
    m = _Object$defineProperty,
    h = _Object$create,
    y = [h(null), h(null)],
    v = t.length;
  function g(t, n, r) {
    return function (o, i) {
      n && (i = o, o = e);
      for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []);
      return r ? i : o;
    };
  }
  function b(e, t, n, r) {
    if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined"));
    return e;
  }
  function applyDec(e, t, n, r, o, i, u, s, f, l, p) {
    var _context, _context3;
    function d(e) {
      if (!p(e)) throw new TypeError("Attempted to access private element on non-instance");
    }
    var h = _concatInstanceProperty(_context = []).call(_context, t[0]),
      v = t[3],
      w = !u,
      D = 1 === o,
      S = 3 === o,
      j = 4 === o,
      E = 2 === o;
    function I(t, n, r) {
      return function (o, i) {
        return n && (i = o, o = e), r && r(o), P[t].call(o, i);
      };
    }
    if (!w) {
      var P = {},
        k = [],
        F = S ? "get" : j || D ? "set" : "value";
      if (f ? (l || D ? P = {
        get: setFunctionName(function () {
          return v(this);
        }, r, "get"),
        set: function set(e) {
          t[4](this, e);
        }
      } : P[F] = v, l || setFunctionName(P[F], r, E ? "" : F)) : l || (P = _Object$getOwnPropertyDescriptor(e, r)), !l && !f) {
        if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet");
        y[+s][r] = o < 3 ? 1 : o;
      }
    }
    for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) {
      var _context2;
      var T = b(h[O], "A decorator", "be", !0),
        z = n ? h[O - 1] : void 0,
        A = {},
        H = {
          kind: ["field", "accessor", "method", "getter", "setter", "class"][o],
          name: r,
          metadata: a,
          addInitializer: _bindInstanceProperty(_context2 = function _context2(e, t) {
            if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished");
            b(t, "An initializer", "be", !0), _pushInstanceProperty(i).call(i, t);
          }).call(_context2, null, A)
        };
      if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = {
        has: f ? _bindInstanceProperty(p).call(p) : function (e) {
          return r in e;
        }
      }, j || (c.get = f ? E ? function (e) {
        return d(e), P.value;
      } : I("get", 0, d) : function (e) {
        return e[r];
      }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) {
        e[r] = t;
      }), N = T.call(z, D ? {
        get: P.get,
        set: P.set
      } : P[F], H), A.v = 1, D) {
        if ("object" == _typeof(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && _unshiftInstanceProperty(k).call(k, c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined");
      } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? _unshiftInstanceProperty(k).call(k, N) : P[F] = N);
    }
    return o < 2 && _pushInstanceProperty(u).call(u, g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? _spliceInstanceProperty(u).call(u, -1, 0, I("get", s), I("set", s)) : _pushInstanceProperty(u).call(u, E ? P[F] : _bindInstanceProperty(_context3 = b.call).call(_context3, P[F])) : m(e, r, P)), N;
  }
  function w(e) {
    return m(e, d, {
      configurable: !0,
      enumerable: !0,
      value: a
    });
  }
  return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) {
    e && _pushInstanceProperty(f).call(f, g(e));
  }, p = function p(t, r) {
    for (var i = 0; i < n.length; i++) {
      var a = n[i],
        c = a[1],
        l = 7 & c;
      if ((8 & c) == t && !l == r) {
        var p = a[2],
          d = !!a[3],
          m = 16 & c;
        applyDec(t ? e : e.prototype, a, m, d ? "#" + p : toPropertyKey(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) {
          return checkInRHS(t) === e;
        } : o);
      }
    }
  }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), {
    e: c,
    get c() {
      var n = [];
      return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)];
    }
  };
}
export { applyDecs2311 as default };