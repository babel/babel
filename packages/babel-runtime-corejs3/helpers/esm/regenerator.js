import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Iterator from "core-js-pure/features/iterator/index.js";
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
          prev: 0,
          next: 0,
          sent: e,
          abrupt: d,
          finish: _bindInstanceProperty(d).call(d, e, 4),
          delegateYield: function delegateYield(t, r) {
            return i = regeneratorValues(t), u = 0, c = e, l.next = r, a;
          }
        };
      function d(r, n) {
        for (u = r, c = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = l.prev,
            G = i[2];
          r > 3 ? (o = G === n) && (u = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (u = 0, l.sent = n, l.next = i[1]) : d < G && (o = r < 3 || i[0] > n || n > G) && (i[4] = r, i[5] = n, l.next = G, u = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, G) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, G), u = p, c = G; (t = u < 2 ? e : c) || !y;) {
          i || (u ? u < 3 ? (u > 1 && (l.next = -1), d(u, c)) : l.next = c : l.sent = c);
          try {
            if (f = 2, i) {
              if (u || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, c))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                c = t.value, u < 2 && (u = 0);
              } else 1 === u && (t = i["return"]) && t.call(i), u < 2 && (c = TypeError("The iterator does not provide a '" + o + "' method"), u = 1);
              i = e;
            } else if ((t = (y = l.next < 0) ? c : r.call(n, l)) !== a) break;
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
  regeneratorDefine(t = {}, n, function () {
    return this;
  });
  var u = [][n] ? _Iterator.prototype : t,
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