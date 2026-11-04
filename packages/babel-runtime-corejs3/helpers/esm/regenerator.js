import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import regeneratorDefine from "./regeneratorDefine.js";
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var r,
    e,
    o = "function" == typeof _Symbol ? _Symbol : {},
    n = o.iterator || "@@iterator",
    a = o.toStringTag || "@@toStringTag";
  function i(o, n, a, i) {
    var u = n && n.prototype instanceof Generator ? n : Generator,
      f = _Object$create(u.prototype);
    return regeneratorDefine(f, "_invoke", function (t, o, n) {
      var a,
        i,
        u,
        f = 0,
        p = n || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: r,
          a: l,
          f: _bindInstanceProperty(l).call(l, r, 4),
          d: function d(t, e) {
            return a = t, i = 0, u = r, G.n = e, c;
          }
        };
      function l(t, o) {
        for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) {
          var n,
            a = p[e],
            l = G.p,
            F = a[2];
          t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0));
        }
        if (n || t > 1) return c;
        throw y = !0, o;
      }
      return function (n, p, F) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) {
          a || (i ? i < 3 ? (i > 1 && (G.n = -1), l(i, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, a) {
              if (i || (n = "next"), e = a[n]) {
                if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object");
                if (!e.done) return e;
                u = e.value, i < 2 && (i = 0);
              } else 1 === i && (e = a["return"]) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1);
              a = r;
            } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break;
          } catch (t) {
            a = r, i = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: e,
          done: y
        };
      };
    }(o, a, i), !0), f;
  }
  var c = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  e = _Object$getPrototypeOf;
  var u = [][n] ? e(e([][n]())) : (regeneratorDefine(e = {}, n, function () {
      return this;
    }), e),
    f = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(u);
  function p(r) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(r, a, "GeneratorFunction")), r.prototype = _Object$create(f), r;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(f, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), regeneratorDefine(f), regeneratorDefine(f, a, "Generator"), regeneratorDefine(f, n, function () {
    return this;
  }), regeneratorDefine(f, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: i,
      m: p
    };
  })();
}
export { _regenerator as default };