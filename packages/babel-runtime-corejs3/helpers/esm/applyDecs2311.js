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
function applyDecs2311(n, o, i, a, c, u) {
  var s,
    f,
    l,
    p,
    d,
    m,
    h,
    v = _Symbol$metadata || _Symbol$for("Symbol.metadata"),
    g = _Object$defineProperty,
    y = _Object$create,
    b = [y(null), y(null)],
    w = o.length;
  function D(e, t, r) {
    return function (o, i) {
      t && (i = o, o = n);
      for (var a = 0; a < e.length; a++) i = e[a].apply(o, r ? [i] : []);
      return r ? i : o;
    };
  }
  function j(e, t, r, n) {
    if ("function" != typeof e && (n || void 0 !== e)) throw new TypeError(t + " must " + (r || "be") + " a function" + (n ? "" : " or undefined"));
    return e;
  }
  function applyDec(e, r, n, o, i, a, c, u, l, p, d) {
    var _context, _context3;
    function m(e) {
      if (!d(e)) throw new TypeError("Attempted to access private element on non-instance");
    }
    var h = _concatInstanceProperty(_context = []).call(_context, r[0]),
      v = r[3],
      y = !c,
      w = 1 === i,
      E = 3 === i,
      O = 4 === i,
      S = 2 === i;
    function T(t, r, n) {
      return function (o, i) {
        return r && (i = o, o = e), n && n(o), z[t].call(o, i);
      };
    }
    if (!y) {
      var z = {},
        A = [],
        I = E ? "get" : O || w ? "set" : "value";
      if (l ? (p || w ? z = {
        get: setFunctionName(function () {
          return v(this);
        }, o, "get"),
        set: function set(e) {
          r[4](this, e);
        }
      } : z[I] = v, p || setFunctionName(z[I], o, S ? "" : I)) : p || (z = _Object$getOwnPropertyDescriptor(e, o)), !p && !l) {
        if ((f = b[+u][o]) && 7 !== (f ^ i)) throw Error("Decorating two elements with the same name (" + z[I].name + ") is not supported yet");
        b[+u][o] = i < 3 ? 1 : i;
      }
    }
    for (var P = e, k = h.length - 1; k >= 0; k -= n ? 2 : 1) {
      var _context2;
      var x = j(h[k], "A decorator", "be", !0),
        F = n ? h[k - 1] : void 0,
        H = {},
        K = {
          kind: ["field", "accessor", "method", "getter", "setter", "class"][i],
          name: o,
          metadata: s,
          addInitializer: _bindInstanceProperty(_context2 = function _context2(e, t) {
            if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished");
            j(t, "An initializer", "be", !0), _pushInstanceProperty(a).call(a, t);
          }).call(_context2, null, H)
        };
      if (y) f = x.call(F, P, K), H.v = 1, j(f, "class decorators", "return") && (P = f);else if (K["static"] = u, K["private"] = l, f = K.access = {
        has: l ? _bindInstanceProperty(d).call(d) : function (e) {
          return o in e;
        }
      }, O || (f.get = l ? S ? function (e) {
        return m(e), z.value;
      } : T("get", 0, m) : function (e) {
        return e[o];
      }), S || E || (f.set = l ? T("set", 0, m) : function (e, t) {
        e[o] = t;
      }), P = x.call(F, w ? {
        get: z.get,
        set: z.set
      } : z[I], K), H.v = 1, w) {
        if ("object" == _typeof(P) && P) (f = j(P.get, "accessor.get")) && (z.get = f), (f = j(P.set, "accessor.set")) && (z.set = f), (f = j(P.init, "accessor.init")) && _unshiftInstanceProperty(A).call(A, f);else if (void 0 !== P) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined");
      } else j(P, (p ? "field" : "method") + " decorators", "return") && (p ? _unshiftInstanceProperty(A).call(A, P) : z[I] = P);
    }
    return i < 2 && _pushInstanceProperty(c).call(c, D(A, u, 1), D(a, u, 0)), p || y || (l ? w ? _spliceInstanceProperty(c).call(c, -1, 0, T("get", u), T("set", u)) : _pushInstanceProperty(c).call(c, S ? z[I] : _bindInstanceProperty(_context3 = j.call).call(_context3, z[I])) : g(e, o, z)), P;
  }
  function E(e) {
    return g(e, v, {
      configurable: !0,
      enumerable: !0,
      value: s
    });
  }
  return void 0 !== u && (s = u[v]), s = y(null == s ? null : s), d = [], m = function m(e) {
    e && _pushInstanceProperty(d).call(d, D(e));
  }, h = function h(t, o) {
    for (var a = 0; a < i.length; a++) {
      var u = i[a],
        s = u[1],
        f = 7 & s;
      if ((8 & s) == t && !f == o) {
        var m = u[2],
          h = !!u[3],
          v = 16 & s;
        applyDec(t ? n : n.prototype, u, v, h ? "#" + m : toPropertyKey(m), f, f < 2 ? [] : t ? p = p || [] : l = l || [], d, !!t, h, o, t && h ? function (t) {
          return checkInRHS(t) === n;
        } : c);
      }
    }
  }, h(8, 0), h(0, 0), h(8, 1), h(0, 1), m(l), m(p), f = d, w || E(n), {
    e: f,
    get c() {
      var e = [];
      return w && [E(n = applyDec(n, [o], a, n.name, 5, e)), D(e, 1)];
    }
  };
}
export { applyDecs2311 as default };