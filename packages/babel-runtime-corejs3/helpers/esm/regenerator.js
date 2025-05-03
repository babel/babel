import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import regeneratorDefine from "./regeneratorDefine.js";
import regeneratorDefineIM from "./regeneratorDefineIM.js";
import regeneratorValues from "./regeneratorValues.js";
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = "function" == typeof _Symbol ? _Symbol : {},
    i = o.iterator || "@@iterator",
    a = o.toStringTag || "@@toStringTag";
  function u(r, n, o, i) {
    var a = n && n.prototype instanceof Generator ? n : Generator,
      u = _Object$create(a.prototype);
    return regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        a,
        u,
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
            return i = regeneratorValues(t), a = 0, u = e, l.next = r, c;
          }
        };
      function d(r, n) {
        for (a = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = l.prev,
            s = i[2];
          r > 3 ? (o = s === n) && (a = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (a = 0, l.sent = n, l.next = i[1]) : d < s && (o = r < 3 || i[0] > n || n > s) && (i[4] = r, i[5] = n, l.next = s, a = 0));
        }
        if (o || r > 1) return c;
        throw y = !0, n;
      }
      return function (o, p, s) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, s), a = p, u = s; (t = a < 2 ? e : u) || !y;) {
          i || (a ? a < 3 ? (a > 1 && (l.next = -1), d(a, u)) : l.next = u : l.sent = u);
          try {
            if (f = 2, i) {
              if (a || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, a < 2 && (a = 0);
              } else 1 === a && (t = i["return"]) && t.call(i), a < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), a = 1);
              i = e;
            } else if ((t = (y = l.next < 0) ? u : r.call(n, l)) !== c) break;
          } catch (t) {
            i = e, a = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var c = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var f = {};
  regeneratorDefine(f, i, function () {
    return this;
  });
  var p = _Object$getPrototypeOf,
    y = p && p(p(regeneratorValues([])));
  y && y !== r && n.call(y, i) && (f = y);
  var l = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(f);
  function d(e) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = _Object$create(l), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(l, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), regeneratorDefineIM(l), regeneratorDefine(l, a, "Generator"), regeneratorDefine(l, i, function () {
    return this;
  }), regeneratorDefine(l, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: u,
      m: d
    };
  })();
}
export { _regenerator as default };