import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import regeneratorDefine from "./regeneratorDefine.js";
import regeneratorValues from "./regeneratorValues.js";
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof _Symbol ? _Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var u = n && n.prototype instanceof Generator ? n : Generator,
      c = _Object$create(u.prototype);
    return regeneratorDefine(c, "_invoke", function (r, n, o) {
      var i,
        u,
        c,
        f = 0,
        p = o || [],
        y = !1,
        l = {
          p: 0,
          n: 0,
          v: e,
          a: G,
          f: _bindInstanceProperty(G).call(G, e, 4),
          d: function d(t, r) {
            return i = regeneratorValues(t), u = 0, c = e, l.n = r, a;
          }
        };
      function G(r, n) {
        for (u = r, c = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            G = l.p,
            d = i[2];
          r > 3 ? (o = d === n) && (u = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= G && ((o = r < 2 && G < i[1]) ? (u = 0, l.v = n, l.n = i[1]) : G < d && (o = r < 3 || i[0] > n || n > d) && (i[4] = r, i[5] = n, l.n = d, u = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, d) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && G(p, d), u = p, c = d; (t = u < 2 ? e : c) || !y;) {
          i || (u ? u < 3 ? (u > 1 && (l.n = -1), G(u, c)) : l.n = c : l.v = c);
          try {
            if (f = 2, i) {
              if (u || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, c))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                c = t.value, u < 2 && (u = 0);
              } else 1 === u && (t = i["return"]) && t.call(i), u < 2 && (c = TypeError("The iterator does not provide a '" + o + "' method"), u = 1);
              i = e;
            } else if ((t = (y = l.n < 0) ? c : r.call(n, l)) !== a) break;
          } catch (t) {
            i = e, u = 1, c = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), c;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = _Object$getPrototypeOf;
  var u = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    c = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(u);
  function f(e) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = _Object$create(c), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(c, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(c), regeneratorDefine(c, o, "Generator"), regeneratorDefine(c, n, function () {
    return this;
  }), regeneratorDefine(c, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  })();
}
export { _regenerator as default };